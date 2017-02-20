export class Entity {

    id?: string;

    constructor(options: any){
        if (!options){
            return;
        }
        this.id = options.id;
    }

}