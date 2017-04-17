import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { RootService } from "../service/root.service";
import { EntityCityItem } from "../model/entity-city-item";

export class EntityRoot extends Entity {


    constructor(options: any){
        super(options);
    }

    getService(){
        return ServiceLocator.injector.get(RootService);
    }

    getCityItems(): Promise<EntityCityItem[]> {
        return this.getService().findCityItemsOf(this);
    }

}