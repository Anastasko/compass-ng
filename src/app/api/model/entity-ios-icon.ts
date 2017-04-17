import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { IosIconService } from "../service/ios-icon.service";


export class EntityIosIcon extends Entity {

    size2x: UrlResource;
    size3x: UrlResource;

    constructor(options: any){
        super(options);
        this.size2x = options.size2x;
        this.size3x = options.size3x;
    }

    getService(){
        return ServiceLocator.injector.get(IosIconService);
    }


}