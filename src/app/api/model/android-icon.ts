import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class AndroidIcon extends Entity {

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

}