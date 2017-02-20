
import { Injectable } from '@angular/core';
import { AndroidIcon } from '../model/android-icon';
import { Service } from "../../common/service.service";

@Injectable()
export class AndroidIconService extends Service<AndroidIcon> {
    
    getInstance(o: any): AndroidIcon {
        return new AndroidIcon(o);
    }

    prefix() {
        return '/androidIcon';
    }
    
    getFields(): any[] {
        return [
  {
    "id": 12,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "xxxhdpi",
    "label": "Xxxhdpi",
    "order": 1
  },
  {
    "id": 13,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "xxhdpi",
    "label": "Xxhdpi",
    "order": 2
  },
  {
    "id": 14,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "xhdpi",
    "label": "Xhdpi",
    "order": 3
  },
  {
    "id": 15,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "mdpi",
    "label": "Mdpi",
    "order": 4
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
    "fieldName": "hdpi",
    "label": "Hdpi",
    "order": 5
  }
];
    }
    
}