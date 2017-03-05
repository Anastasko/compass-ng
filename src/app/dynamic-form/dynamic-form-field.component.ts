import {Component, Input, OnInit} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FieldViewModel} from "../common/model/field-view-model";
import {ServiceFactory} from "../api/service-factory.service";
import {Service} from "../common/service/service.service";
import {UrlResourceService} from "../common/service/url-resource.service";

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
        this.entities = data;
      })
    } else if (this.field.fieldType.primitiveEntityType == 'URL_RESOURCE'){
      this.urlResourceService.findAll().then(data => {
        this.entities = data;
      })
    }
  }

  constructor(private serviceFactory: ServiceFactory,
              private urlResourceService: UrlResourceService) {
  }

  get isValid() {
    return this.form.controls[this.field.fieldName].valid;
  }

  getFieldService(): Service<any> {
    return this.serviceFactory.getService(this.field.fieldType.id);
  }

}
