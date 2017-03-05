import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { CityItemService } from "../service/city-item.service";
import { EntityMap } from "../model/entity-map";

export class EntityCityItem extends Entity {

    name: string;
    longitude: number;
    latitude: number;
    kind: Entity;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.kind = new Entity(options.kind);
        this.owner = new Entity(options.owner);
    }

    getService(){
        return ServiceLocator.injector.get(CityItemService);
    }

    getMaps(): Promise<EntityMap[]> {
        return this.getService().findMapsOf(this);
    }

}