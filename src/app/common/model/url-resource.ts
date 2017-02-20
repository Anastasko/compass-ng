export class UrlResource {

    url?: string;

    constructor(options: any){
        if (!options){
            return;
        }
        this.url = options.url;
    }

}