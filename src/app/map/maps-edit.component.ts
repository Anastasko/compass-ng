import {Component, OnInit, OnDestroy, Output, EventEmitter, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CityItemService} from "../api/service/city-item.service";
import {EntityCityItem} from "../api/model/entity-city-item";
import {EntityMap} from "../api/model/entity-map";
import {utils} from "../common/utils";
import {EntityMapItem} from "../api/model/entity-map-item";
import {MapEditComponent} from "./map-edit/map-edit.component";

@Component({
  selector: 'app-maps-edit',
  templateUrl: 'maps-edit.component.html',
  styleUrls: ['maps-edit.component.css']
})
export class MapsEditComponent implements OnInit, OnDestroy {

  private sub: any;
  maps: EntityMap[];
  mapItems: EntityMapItem[] = [];

  @ViewChildren(MapEditComponent)
  mapComponents: QueryList<MapEditComponent>;

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      let owner = new EntityCityItem({id: id});
      owner.getMaps().then(maps => {
        maps.sort(utils.attrComparator('floor'));
        this.maps = maps;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onItemsLoaded(items){
    this.mapItems.push(...items);
  }

  onTabClick(tab){
    let ind = tab.index;
    let cmp = this.mapComponents.toArray()[ind];
    cmp.initMap();
  }

}
