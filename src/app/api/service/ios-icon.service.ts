
import { Injectable } from '@angular/core';
import { IosIcon } from '../model/ios-icon';
import { Service } from "../../common/service.service";

@Injectable()
export class IosIconService extends Service<IosIcon> {
    
    getInstance(o: any): IosIcon {
        return new IosIcon(o);
    }

    prefix() {
        return '/iosIcon';
    }
    
    getFields(): any[] {
        return [
  {
    "id": 10,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "size2x",
    "label": "Size 2x",
    "order": 1
  },
  {
    "id": 11,
    "fieldKind": "REGULAR",
    "fieldType": {
      "id": 3,
      "typeName": "Undefined",
      "typeKind": "PRIMITIVE",
      "primitiveEntityType": "URL_RESOURCE"
    },
    "fieldName": "size3x",
    "label": "Size 3x",
    "order": 2
  }
];
    }
    
}