
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityItemKind } from '../model/entity-item-kind';
import { Service } from "../../common/service/service.service";

@Injectable()
export class ItemKindService extends Service<EntityItemKind> {
    
    getInstance(o: any): EntityItemKind {
        return new EntityItemKind(o);
    }

    prefix() {
        return '/itemKind';
    }

    getFields(): any[] {
        return [
  {
    "id": 24,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "name",
    "label": "Name",
    "order": 1,
    "prefixPath": ""
  },
  {
    "id": 25,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 5,
      "typeName": "IosIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "iosIcon",
    "label": "Ios Icon",
    "order": 2,
    "prefixPath": ""
  },
  {
    "id": 26,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 5,
      "typeName": "IosIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "iosSelectedIcon",
    "label": "Ios Selected Icon",
    "order": 3,
    "prefixPath": ""
  },
  {
    "id": 27,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 6,
      "typeName": "AndroidIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "androidIcon",
    "label": "Android Icon",
    "order": 4,
    "prefixPath": ""
  },
  {
    "id": 28,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 6,
      "typeName": "AndroidIcon",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "androidSelectedIcon",
    "label": "Android Selected Icon",
    "order": 5,
    "prefixPath": ""
  }
];
    }
    
}