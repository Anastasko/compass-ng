import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {EntityMap} from "../../api/model/entity-map";
import {EntityCityItem} from "../../api/model/entity-city-item";
import {Router} from "@angular/router";
import {MapService} from "../../api/service/map.service";
import {utils} from "../../common/utils";
import {ItemIconService} from "../../common/service/item-icon.service";

@Component({
  selector: 'city-item-maps',
  templateUrl: './city-item-maps.component.html',
  styleUrls: ['./city-item-maps.component.css']
})
export class CityItemMapsComponent implements OnInit {

  @Input()
  cityItem: EntityCityItem;

  @Output()
  onUpdate = new EventEmitter();

  private maps: EntityMap[];
  private iconsReady: boolean = false;

  constructor(private _router: Router,
              private mapService: MapService,
              private itemIconService: ItemIconService){

  }

  ngOnInit() {
    this.itemIconService.init().then(() => {
      this.iconsReady = true;
    });
    this.cityItem.getMaps()
      .then(maps => {
        maps.sort(utils.attrComparator('floor'));
        this.maps = maps;
      });
  }

  update(map: EntityMap) {
    this.onUpdate.emit(map);
  }

  delete(map: EntityMap, index: number) {
    this.mapService.delete(map)
      .then(() => {
        this.maps.splice(index, 1);
      })
  }

  add() {
    this.update(new EntityMap({
      owner: {
        id: this.cityItem.id
      }
    }));
  }

  openMaps(cityItem){
    this._router.navigate([`${cityItem.id}/maps`]);
  }

}
