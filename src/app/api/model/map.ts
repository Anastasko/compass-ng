import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class Map extends Entity {

    image: UrlResource;
    floor: number;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.image = options.image;
        this.floor = options.floor;
        this.owner = new Entity(options.owner);
    }

}