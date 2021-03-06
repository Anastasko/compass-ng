import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { AndroidIconService } from "../service/android-icon.service";


export class EntityAndroidIcon extends Entity {

    xxxhdpi: UrlResource;
    xxhdpi: UrlResource;
    xhdpi: UrlResource;
    mdpi: UrlResource;
    hdpi: UrlResource;

    constructor(options: any){
        super(options);
        this.xxxhdpi = options.xxxhdpi;
        this.xxhdpi = options.xxhdpi;
        this.xhdpi = options.xhdpi;
        this.mdpi = options.mdpi;
        this.hdpi = options.hdpi;
    }

    getService(){
        return ServiceLocator.injector.get(AndroidIconService);
    }


}