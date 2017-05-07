import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../api/service/map.service';
import { EntityMap } from '../api/model/entity-map';
import { CityItemService } from "../api/service/city-item.service";
import { Entity } from "../common/model/entity";
import {EntityCityItem} from "../api/model/entity-city-item";

@Component({
  selector: 'x-map',
  templateUrl: './maps.component.html',
  providers: [MapService]
})
export class MapsComponent {

  cityItems: EntityCityItem[] = [];

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
          .then(cityItem => {
            this.cityItems.push(cityItem);
          });
      } else {
        this.mapService.findAll()
          .then((maps: EntityMap[]) => {
            let ids = maps.map(m => m.owner.id);
            ids = Array.from(new Set(ids));
            return this.cityItemService.findMany(ids);
          })
          .then((owners) => {
            this.cityItems.push(...owners);
          });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  callback(item) {
    this.showForm = false;
  }

  update(map: EntityMap){
    this.showForm = true;
    this.mapForm.render(map);
  }

}
