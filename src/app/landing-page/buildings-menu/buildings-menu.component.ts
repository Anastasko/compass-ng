import { Component, OnInit } from '@angular/core';

import { Building } from './building.model';
import { BuildingHttpService } from './building-http.service';

@Component({
  selector: 'app-buildings-menu',
  templateUrl: './buildings-menu.component.html',
  styleUrls: ['./buildings-menu.component.scss'],
  providers: [BuildingHttpService]
})
export class BuildingsMenuComponent implements OnInit {
  private buildings: Building[];

  constructor(
    private _http: BuildingHttpService) {
    this.buildings = Building.fromJSONArray(this._http.getBuildings())
  }

  ngOnInit() {
  }

}
