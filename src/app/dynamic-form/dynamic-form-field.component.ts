import {Component, Input, OnInit} from '@angular/core';
import {FormGroup}        from '@angular/forms';
import {FieldViewModel} from "../common/model/field-view-model";
import {ServiceFactory} from "../api/service-factory.service";
import {Service} from "../common/service/service.service";
import {UrlResourceService} from "../common/service/url-resource.service";
import {UrlResource} from "../common/model/url-resource";

@Component({
  selector: 'df-field',
  templateUrl: 'dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent implements OnInit {

  private entities : any[] = [];
  private selected : any;

  @Input() field: FieldViewModel;
  @Input() form: FormGroup;

  sortBy(a: any, b: any, attr: string){
    if (a[attr] > b[attr]) return 1;
    if (a[attr] < b[attr]) return -1;
    return 0;
  }

  ngOnInit(): void {
    if (this.field.fieldType.typeKind == 'ENTITY') {
      this.getFieldService().findAll().then(data => {
        data.sort((d1, d2) => {
          if (d1.name && d2.name){
            return this.sortBy(d1, d2, 'name');
          } else {
            return this.sortBy(d1, d2, 'id');
          }
        });
        this.entities = data;
      });
    } else if (this.field.fieldType.primitiveEntityType == 'URL_RESOURCE'){
      this.urlResourceService.findAll(this.field.prefixPath).then(data => {
        this.entities = data;
      });
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

  enhance(item: any) {
    if (this.field.fieldType.typeKind === 'ENTITY'){
      item[this.field.fieldName] = this.findEntity(item[this.field.fieldName], 'id');
    } else if (this.field.fieldType.primitiveEntityType === 'URL_RESOURCE'){
      item[this.field.fieldName] = this.findEntity(item[this.field.fieldName], 'url');
    }
  }

  dishance(item: any){
    if (this.field.fieldType.typeKind === 'ENTITY'){
      item[this.field.fieldName] = item[this.field.fieldName] && {
        id: item[this.field.fieldName].id
      }
    }
  }

  private findEntity(field: any, key: string) {
    if (field == null){
      return null;
    }
    for(let entity of this.entities){
      if (entity[key] === field[key]){
        return entity;
      }
    }
  }

  getResourceShortPath(resource: UrlResource){
    let len = this.field.prefixPath.length;
    return resource.url.substr(len+1);
  }

}
