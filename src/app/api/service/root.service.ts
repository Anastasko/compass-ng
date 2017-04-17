
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

    findCityItemsOf(owner: EntityRoot){
        return this.getRequest('/' + owner.id + '/cityItems');
    }

    getFields(): any[] {
        return [
  {
    "id": 49,
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
    }
    
}