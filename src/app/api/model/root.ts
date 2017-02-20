import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class Root extends Entity {

    cityItems: Entity;

    constructor(options: any){
        super(options);
        this.cityItems = new Entity(options.cityItems);
    }

}