
import { Injectable } from '@angular/core';
import { ItemKind } from '../model/item-kind';
import { Service } from "../../common/service.service";

@Injectable()
export class ItemKindService extends Service<ItemKind> {
    
    getInstance(o: any): ItemKind {
        return new ItemKind(o);
    }

    prefix() {
        return '/itemKind';
    }
    
    getFields(): any[] {
        return [
  {
    "id": 17,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "name",
    "label": "Name",
    "order": 1
  },
  {
    "id": 18,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 5,
      "typeName": "IosIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "iosIcon",
    "label": "Ios Icon",
    "order": 2
  },
  {
    "id": 19,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 6,
      "typeName": "AndroidIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "androidIcon",
    "label": "Android Icon",
    "order": 3
  }
];
    }
    
}