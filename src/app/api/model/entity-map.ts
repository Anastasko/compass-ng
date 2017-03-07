import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { MapService } from "../service/map.service";
import { EntityMapItem } from "../model/entity-map-item";

export class EntityMap extends Entity {

    image: UrlResource;
    floor: number;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.image = options.image;
        this.floor = options.floor;
        this.owner = new Entity(options.owner);
    }

    getService(){
        return ServiceLocator.injector.get(MapService);
    }

    getMapItems(): Promise<EntityMapItem[]> {
        return this.getService().findMapItemsOf(this);
    }

}