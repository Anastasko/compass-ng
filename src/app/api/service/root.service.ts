import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityRoot } from '../model/entity-root';
import { Service } from "../../common/service/service.service";

@Injectable()
export class RootService extends Service<EntityRoot> {

  getInstance(o: any): EntityRoot {
    return new EntityRoot(o);
  }

  prefix() {
    return '/root';
  }

  findCityItemsOf(owner: EntityRoot) {
    return this.getRequest('/' + owner.id + '/cityItems');
  }

<<<<<<< HEAD
  getFields(): any[] {
    return [
      {
        "id": 39,
        "fieldKind": "COLLECTION",
        "fieldType": {
          "id": 8,
          "typeName": "CityItem",
          "typeKind": "ENTITY",
          "primitiveEntityType": null
        },
        "fieldName": "cityItems",
        "label": "City Items",
        "order": 1,
        "prefixPath": ""
      }
    ];
=======
    getFields(): any[] {
        return [
  {
    "id": 47,
    "fieldKind": "COLLECTION",
    "fieldType": {
      "id": 8,
      "typeName": "CityItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "cityItems",
    "label": "City Items",
    "order": 1,
    "prefixPath": ""
>>>>>>> faculties
  }

}
