
import { Injectable } from '@angular/core';
import { Root } from '../model/root';
import { Service } from "../../common/service.service";

@Injectable()
export class RootService extends Service<Root> {
    
    getInstance(o: any): Root {
        return new Root(o);
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