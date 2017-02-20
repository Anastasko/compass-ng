import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class CityItem extends Entity {

    name: string;
    longitude: number;
    latitude: number;
    maps: Entity;
    kind: Entity;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.longitude = options.longitude;
        this.latitude = options.latitude;
        this.maps = new Entity(options.maps);
        this.kind = new Entity(options.kind);
        this.owner = new Entity(options.owner);
    }

}