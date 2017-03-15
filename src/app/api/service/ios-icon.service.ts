import { config } from '../../config';
import { Injectable } from '@angular/core';
import { EntityIosIcon } from '../model/entity-ios-icon';
import { Service } from "../../common/service/service.service";

@Injectable()
export class IosIconService extends Service<EntityIosIcon> {

  getInstance(o: any): EntityIosIcon {
    return new EntityIosIcon(o);
  }

  prefix() {
    return '/iosIcon';
  }

  getFields(): any[] {
    return [
      {
        "id": 11,
        "fieldKind": "REGULAR",
        "fieldType": {
          "id": 3,
          "typeName": "Undefined",
          "typeKind": "PRIMITIVE",
          "primitiveEntityType": "URL_RESOURCE"
        },
        "fieldName": "size2x",
        "label": "Size 2x",
        "order": 1,
        "prefixPath": "/uploads/icons/ios"
      },
      {
        "id": 12,
        "fieldKind": "REGULAR",
        "fieldType": {
          "id": 3,
          "typeName": "Undefined",
          "typeKind": "PRIMITIVE",
          "primitiveEntityType": "URL_RESOURCE"
        },
        "fieldName": "size3x",
        "label": "Size 3x",
        "order": 2,
        "prefixPath": "/uploads/icons/ios"
      }
    ];
  }

}
