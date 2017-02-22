import {Component, Input, OnInit} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FieldViewModel} from "../common/model/field-view-model";
import {ServiceFactory} from "../api/service-factory.service";
import {Service} from "../common/service.service";

@Component({
  selector: 'df-field',
  templateUrl: 'dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent implements OnInit {

  private entities : any[] = [];

  @Input() field: FieldViewModel;
  @Input() form: FormGroup;

  ngOnInit(): void {
    if (this.field.fieldType.typeKind == 'ENTITY') {
      this.getFieldService().findAll().then(data => {
        console.log(data);
        this.entities = data;
      })
    }
  }

  constructor(private serviceFactory: ServiceFactory) {
  }

  get isValid() {
    return this.form.controls[this.field.fieldName].valid;
  }

  getFieldService(): Service<any> {
    return this.serviceFactory.getService(this.field.fieldType.id);
  }

}
