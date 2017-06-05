
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
    "id": 29,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "image",
    "label": "Image",
    "order": 1,
    "prefixPath": "/uploads/maps"
  },
  {
    "id": 30,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 0,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "INTEGER"
    },
    "fieldName": "floor",
    "label": "Floor",
    "order": 2,
    "prefixPath": ""
  },
  {
    "id": 31,
    "fieldKind": "COLLECTION",
    "fieldType": {
      "id": 10,
      "typeName": "MapItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "mapItems",
    "label": "Map Items",
    "order": 3,
    "prefixPath": ""
  },
  {
    "id": 41,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 8,
      "typeName": "CityItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "owner",
    "label": "Owner",
    "order": 4,
    "prefixPath": ""
  }
];
    }
    
}