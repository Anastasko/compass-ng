
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityMapItem } from '../model/entity-map-item';
import { Service } from "../../common/service/service.service";

@Injectable()
export class MapItemService extends Service<EntityMapItem> {
    
    getInstance(o: any): EntityMapItem {
        return new EntityMapItem(o);
    }

    prefix() {
        return '/mapItem';
    }

    getFields(): any[] {
        return [
  {
    "id": 32,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 9,
      "typeName": "Map",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "owner",
    "label": "Owner",
    "order": 1,
    "prefixPath": ""
  },
  {
    "id": 42,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "name",
    "label": "Name",
    "order": 2,
    "prefixPath": ""
  },
  {
    "id": 43,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 2,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "DOUBLE"
    },
    "fieldName": "x",
    "label": "X",
    "order": 3,
    "prefixPath": ""
  },
  {
    "id": 44,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 2,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "DOUBLE"
    },
    "fieldName": "y",
    "label": "Y",
    "order": 4,
    "prefixPath": ""
  },
  {
    "id": 45,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 2,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "DOUBLE"
    },
    "fieldName": "square",
    "label": "Square",
    "order": 5,
    "prefixPath": ""
  },
  {
    "id": 46,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "room",
    "label": "Room",
    "order": 6,
    "prefixPath": ""
  },
  {
    "id": 47,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 4,
      "typeName": "ItemKind",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "kind",
    "label": "Kind",
    "order": 7,
    "prefixPath": ""
  },
  {
    "id": 48,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 11,
      "typeName": "Faculty",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "faculty",
    "label": "Faculty",
    "order": 8,
    "prefixPath": ""
  }
];
    }
    
}