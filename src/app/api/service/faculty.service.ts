
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityFaculty } from '../model/entity-faculty';
import { Service } from "../../common/service/service.service";

@Injectable()
export class FacultyService extends Service<EntityFaculty> {
    
    getInstance(o: any): EntityFaculty {
        return new EntityFaculty(o);
    }

    prefix() {
        return '/faculty';
    }

    getFields(): any[] {
        return [
  {
    "id": 12,
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
    "id": 13,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "phone",
    "label": "Phone",
    "order": 2,
    "prefixPath": ""
  },
  {
    "id": 14,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "email",
    "label": "Email",
    "order": 3,
    "prefixPath": ""
  },
  {
    "id": 15,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 1,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "STRING"
    },
    "fieldName": "website",
    "label": "Website",
    "order": 4,
    "prefixPath": ""
  },
  {
    "id": 16,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "icon",
    "label": "Icon",
    "order": 5,
    "prefixPath": "/uploads/faculties"
  },
  {
    "id": 42,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 8,
      "typeName": "CityItem",
      "typeKind": "ENTITY",
      "primitiveEntityType": null
    },
    "fieldName": "owner",
    "label": "Owner",
    "order": 6,
    "prefixPath": ""
  }
];
    }
    
}