import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { MapItemService } from "../service/map-item.service";


export class EntityMapItem extends Entity {

    owner: Entity;
    name: string;
    x: number;
    y: number;
    square: number;
    room: string;
    kind: Entity;
    faculty: Entity;

    constructor(options: any){
        super(options);
        this.owner = new Entity(options.owner);
        this.name = options.name;
        this.x = options.x;
        this.y = options.y;
        this.square = options.square;
        this.room = options.room;
        this.kind = new Entity(options.kind);
        this.faculty = new Entity(options.faculty);
    }

    getService(){
        return ServiceLocator.injector.get(MapItemService);
    }


}