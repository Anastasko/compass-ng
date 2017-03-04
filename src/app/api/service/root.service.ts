
import { Injectable } from '@angular/core';
import { EntityRoot } from '../model/entity-root';
import { Service } from "../../common/service.service";

@Injectable()
export class RootService extends Service<EntityRoot> {
    
    getInstance(o: any): EntityRoot {
        return new EntityRoot(o);
    }

    prefix() {
        return '/root';
    }
    
    getFields(): any[] {
        return [
  {
    "id": 28,
    "fieldKind": "COLLECTION",
    "fieldType": {
      "id": 8,
      "typeName": "CityItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "cityItems",
    "label": "City Items",
    "order": 1
  }
];
    }
    
}