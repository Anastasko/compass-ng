import {Component, OnInit, ViewChild}       from '@angular/core';
import {MapService} from '../api/service/map.service';
import {ServiceFactory} from "../api/service-factory.service";

@Component({
    selector: 'my-app',
    templateUrl: `./index.component.html`
})
export class IndexComponent {

    constructor(private mapService : MapService,
                private serviceFactory: ServiceFactory) {

    }

}
