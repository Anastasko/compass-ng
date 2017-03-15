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
        "id": 26,
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
        "id": 34,
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
        "id": 35,
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
        "id": 36,
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
        "id": 37,
        "fieldKind": "REGULAR",
        "fieldType": {
          "id": 2,
          "typeName": "Undefined",
          "typeKind": "PRIMITIVE",
          "primitiveEntityType": "DOUBLE"
        },
        "fieldName": "path",
        "label": "Path",
        "order": 5,
        "prefixPath": ""
      },
      {
        "id": 38,
        "fieldKind": "REGULAR",
        "fieldType": {
          "id": 4,
          "typeName": "ItemKind",
          "typeKind": "ENTITY",
          "primitiveEntityType": null
        },
        "fieldName": "kind",
        "label": "Kind",
        "order": 6,
        "prefixPath": ""
      }
    ];
  }

}
