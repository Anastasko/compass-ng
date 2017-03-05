import { Injectable } from '@angular/core';
import {Service} from "../common/service/service.service";
import {ItemKindService} from './service/item-kind.service'
import {IosIconService} from './service/ios-icon.service'
import {AndroidIconService} from './service/android-icon.service'
import {RootService} from './service/root.service'
import {CityItemService} from './service/city-item.service'
import {MapService} from './service/map.service'

@Injectable()
export class ServiceFactory {
    
    constructor(
        private itemKindService : ItemKindService,
        private iosIconService : IosIconService,
        private androidIconService : AndroidIconService,
        private rootService : RootService,
        private cityItemService : CityItemService,
        private mapService : MapService){}
    
    getService(id: number): Service<any> {
        switch (id) {
            case 4:
                return this.itemKindService;
            case 5:
                return this.iosIconService;
            case 6:
                return this.androidIconService;
            case 7:
                return this.rootService;
            case 8:
                return this.cityItemService;
            case 9:
                return this.mapService;
        }
    }
    
}