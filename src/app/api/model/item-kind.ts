import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class ItemKind extends Entity {

    name: string;
    iosIcon: Entity;
    androidIcon: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.iosIcon = new Entity(options.iosIcon);
        this.androidIcon = new Entity(options.androidIcon);
    }

}