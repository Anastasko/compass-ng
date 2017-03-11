import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { ItemKindService } from "../service/item-kind.service";


export class EntityItemKind extends Entity {

    name: string;
    iosIcon: Entity;
    iosSelectedIcon: Entity;
    androidIcon: Entity;
    androidSelectedIcon: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.iosIcon = new Entity(options.iosIcon);
        this.iosSelectedIcon = new Entity(options.iosSelectedIcon);
        this.androidIcon = new Entity(options.androidIcon);
        this.androidSelectedIcon = new Entity(options.androidSelectedIcon);
    }

    getService(){
        return ServiceLocator.injector.get(ItemKindService);
    }


}