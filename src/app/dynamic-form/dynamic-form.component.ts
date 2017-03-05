import {Component, Input, OnInit, Output, EventEmitter}  from '@angular/core';
import {FormGroup}                 from '@angular/forms';
import {QuestionControlService}    from './field-control.service';
import {Service} from "../common/service/service.service";
import {FieldViewModel} from "../common/model/field-view-model";

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  ngOnInit(): void {
    this.fields = this.service.getFields().filter(f => f.fieldKind === 'REGULAR');
    this.form = this.qcs.toFormGroup(this.fields);
  }

  fields: FieldViewModel[] = [];

  @Input() service: Service<any>;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  item: any;

  constructor(private qcs: QuestionControlService) {
  }

  render(item: any) {
    this.item = item;
    this.form.reset(item);
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.item.id) {
      this.form.value.id = this.item.id;
      this.service.update(this.form.value).then(() => {
        this.service.findOne(this.item.id).then(upd => {
          this.service.merge(this.item, upd);
          this.callback.emit(null);
        });
      });
    } else {
      this.service.create(this.form.value).then((r) => {
        this.service.findOne(r.json().id).then(created => {
          this.item.id = created.id;
          this.service.merge(this.item, created);
          this.callback.emit(null);
        });
      });
    }
  }

}
