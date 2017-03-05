import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { ItemKindService } from "../service/item-kind.service";


export class EntityItemKind extends Entity {

    name: string;
    iosIcon: Entity;
    androidIcon: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.iosIcon = new Entity(options.iosIcon);
        this.androidIcon = new Entity(options.androidIcon);
    }

    getService(){
        return ServiceLocator.injector.get(ItemKindService);
    }


}