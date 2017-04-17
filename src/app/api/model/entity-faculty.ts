import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { FacultyService } from "../service/faculty.service";


export class EntityFaculty extends Entity {

    name: string;
    phone: string;
    email: string;
    website: string;
    icon: UrlResource;
    owner: Entity;

    constructor(options: any){
        super(options);
        this.name = options.name;
        this.phone = options.phone;
        this.email = options.email;
        this.website = options.website;
        this.icon = options.icon;
        this.owner = new Entity(options.owner);
    }

    getService(){
        return ServiceLocator.injector.get(FacultyService);
    }


}