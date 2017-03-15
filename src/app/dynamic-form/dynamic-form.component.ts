import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionControlService }    from './field-control.service';
import { Service } from "../common/service/service.service";
import { FieldViewModel } from "../common/model/field-view-model";
import { DynamicFormFieldComponent } from "./dynamic-form-field.component";

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

  @ViewChildren(DynamicFormFieldComponent) fieldComponents: QueryList<DynamicFormFieldComponent>;

  form: FormGroup;
  item: any;

  constructor(private qcs: QuestionControlService) {
  }

  render(item: any) {
    this.item = item;
    this.fieldComponents.forEach(fieldComponent => {
      fieldComponent.enhance(this.item);
    });
    this.form.reset(this.item);
  }

  onSubmit() {
    console.log(this.form.value);
    let data = this.form.value;
    this.fieldComponents.forEach(fieldComponent => {
      fieldComponent.dishance(data);
    });
    if (this.item.id) {
      data.id = this.item.id;
      this.service.update(data).then(() => {
        this.service.findOne(this.item.id).then(upd => {
          this.service.merge(this.item, upd);
          this.callback.emit(null);
        });
      });
    } else {
      this.service.create(data).then(id => {
        this.service.findOne(id).then(created => {
          this.callback.emit(created);
        });
      });
    }
  }

}
