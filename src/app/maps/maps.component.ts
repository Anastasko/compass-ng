import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {MapService} from '../api/service/map.service';
import {EntityMap} from '../api/model/entity-map';

@Component({
    selector: 'x-map',
    templateUrl: './maps.component.html',
    providers: [MapService]
})
export class MapsComponent {

    maps: EntityMap[];

    @ViewChild('mapForm') mapForm : any;
    private showForm : boolean = false;

    constructor(private mapService: MapService,
                private _router: Router) {

    }

    ngOnInit() {
        this.mapService.findAll()
            .then((maps : EntityMap[]) => {
                this.maps = maps;
            });
    }

    open(map: EntityMap) {
        this._router.navigate([`/map/edit/${map.id}`]);
    }

    update(map: EntityMap){
        this.showForm = true;
        this.mapForm.render(map);
    }

    delete(map: EntityMap, index: number) {
        this.mapService.delete(map)
            .then(() => {
                this.maps.splice(index, 1);
            })
    }

    add(){
        this._router.navigate([`/map/create`]);
    }

}
