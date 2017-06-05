import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { CityItemService } from "../service/city-item.service";
import { EntityMap } from "../model/entity-map";import { EntityFaculty } from "../model/entity-faculty";

export class EntityCityItem extends Entity {

    name: string;
    placeId: string;
    longitude: number;
    latitude: number;
    address: string;
    kind: Entity;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.placeId = options.placeId;
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.address = options.address;
        this.kind = new Entity(options.kind);
        this.owner = new Entity(options.owner);
    }

    getService(){
        return ServiceLocator.injector.get(CityItemService);
    }

    getMaps(): Promise<EntityMap[]> {
        return this.getService().findMapsOf(this);
    }
    getFaculties(): Promise<EntityFaculty[]> {
        return this.getService().findFacultiesOf(this);
    }

}