
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityMap } from '../model/entity-map';
import { Service } from "../../common/service/service.service";

@Injectable()
export class MapService extends Service<EntityMap> {
    
    getInstance(o: any): EntityMap {
        return new EntityMap(o);
    }

    prefix() {
        return '/map';
    }

    findMapItemsOf(owner: EntityMap){
        return this.getRequest('/' + owner.id + '/mapItems');
    }

    getFields(): any[] {
        return [
  {
    "id": 21,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "image",
    "label": "Image",
    "order": 1
  },
  {
    "id": 22,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 0,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "INTEGER"
    },
    "fieldName": "floor",
    "label": "Floor",
    "order": 2
  },
  {
    "id": 23,
    "fieldKind": "COLLECTION",
    "fieldType": {
      "id": 10,
      "typeName": "MapItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "mapItems",
    "label": "Map Items",
    "order": 3
  },
  {
    "id": 30,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 8,
      "typeName": "CityItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "owner",
    "label": "Owner",
    "order": 4
  }
];
    }
    
}