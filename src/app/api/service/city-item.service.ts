
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityCityItem } from '../model/entity-city-item';
import { Service } from "../../common/service/service.service";

@Injectable()
export class CityItemService extends Service<EntityCityItem> {
    
    getInstance(o: any): EntityCityItem {
        return new EntityCityItem(o);
    }

    prefix() {
        return '/cityItem';
    }

    findMapsOf(owner: EntityCityItem){
        return this.getRequest('/' + owner.id + '/maps');
    }

    getFields(): any[] {
        return [
  {
    "id": 25,
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
    "id": 26,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 2,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "DOUBLE"
    },
    "fieldName": "longitude",
    "label": "Longitude",
    "order": 2
  },
  {
    "id": 27,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 2,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "DOUBLE"
    },
    "fieldName": "latitude",
    "label": "Latitude",
    "order": 3
  },
  {
    "id": 28,
    "fieldKind": "COLLECTION",
    "fieldType": {
      "id": 9,
      "typeName": "Map",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "maps",
    "label": "Maps",
    "order": 4
  },
  {
    "id": 29,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 4,
      "typeName": "ItemKind",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "kind",
    "label": "Kind",
    "order": 5
  },
  {
    "id": 37,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 7,
      "typeName": "Root",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "owner",
    "label": "Owner",
    "order": 6
  }
];
    }
    
}