import {Component, Input, OnInit}  from '@angular/core';
import {FormGroup}                 from '@angular/forms';
import {QuestionControlService}    from './field-control.service';
import {Service} from "../common/service.service";
import {FieldViewModel} from "../common/model/field-view-model";

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  ngOnInit(): void {
    this.fields = this.service.getFields();
    this.form = this.qcs.toFormGroup(this.fields);
  }

  fields: FieldViewModel[] = [];

  @Input() service: Service<any>;
  @Input() callback: Function;

  form: FormGroup;
  id: string;

  constructor(private qcs: QuestionControlService) {
  }

  render(item: any) {
    this.id = item.id;
    this.form.reset(item);
  }

  onSubmit() {
    if (this.id) {
      this.form.value.id = this.id;
      this.service.update(this.form.value).then(() => {
        this.callback(this.service.findOne(this.id));
      });
    } else {
      this.service.create(this.form.value).then((r) => {
        this.callback(this.service.findOne(r.json().id));
      });
    }
  }

}
