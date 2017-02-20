import {Component, OnInit, ViewChild}       from '@angular/core';
import {MapService} from '../api/service/map.service';
import {ServiceFactory} from "../api/service-factory.service";

@Component({
    selector: 'my-app',
    template: `
    <div>
      <dynamic-form #mapForm
        [service]="mapService">
      </dynamic-form>
    </div>
  `
})
export class IndexComponent {

    // @ViewChild('mapForm') mapForm : any;

    constructor(private mapService : MapService,
                private serviceFactory: ServiceFactory) {
        // serviceFactory.getService(9).findAll().then(console.log);
    }

}
