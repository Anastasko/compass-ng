import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../api/service/map.service';
import { EntityMap } from '../api/model/entity-map';
import { CityItemService } from "../api/service/city-item.service";
import { Entity } from "../common/model/entity";

@Component({
  selector: 'x-map',
  templateUrl: './maps.component.html',
  providers: [MapService]
})
export class MapsComponent {

  maps: EntityMap[];
  owner: Entity;

  @ViewChild('mapForm') mapForm: any;
  private showForm: boolean = false;

  private sub: any;

  constructor(private mapService: MapService,
              private _router: Router,
              private cityItemService: CityItemService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.owner = new Entity({
          id: +params['id']
        });
        this.cityItemService.findOne(params['id'])
          .then(cityItem => cityItem.getMaps())
          .then((maps: EntityMap[]) => {
            this.maps = maps;
          });
      } else {
        this.mapService.findAll()
          .then((maps: EntityMap[]) => {
            this.maps = maps;
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  callback(item) {
    if (item) {
      this.maps.push(item);
    }
    this.showForm = false;
  }

  open(map: EntityMap) {
    this._router.navigate([`/admin/map/edit/${map.id}`]);
  }

  update(map: EntityMap) {
    this.showForm = true;
    this.mapForm.render(map);
  }

  delete(map: EntityMap, index: number) {
    this.mapService.delete(map)
      .then(() => {
        this.maps.splice(index, 1);
      })
  }

  add() {
    this.update(new EntityMap({
      owner: this.owner
    }));
  }

}
