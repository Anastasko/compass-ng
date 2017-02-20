import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class IosIcon extends Entity {

    size2x: UrlResource;
    size3x: UrlResource;

    constructor(options: any){
        super(options);
        this.size2x = options.size2x;
        this.size3x = options.size3x;
    }

}