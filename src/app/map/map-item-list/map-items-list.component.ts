import {Component, Input, OnInit, OnDestroy, NgZone, ViewChild, Output, EventEmitter} from '@angular/core';
import { MapService } from '../../api/service/map.service';
import { EntityMap } from  '../../api/model/entity-map';
import { Routes, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import * as d3 from 'd3';
import { config } from "../../config";
import { Entity } from "../../common/model/entity";
import { EntityMapItem } from "../../api/model/entity-map-item";
import { MapItemService } from "../../api/service/map-item.service";

@Component({
  selector: 'map-items-list',
  templateUrl: `./map-items-list.component.html`,
  providers: [MapService],
  styleUrls: [
    'map-item-list.css'
  ]
})
export class MapItemsListComponent {

  @Input()
  rooms: EntityMapItem[] = [];

  @Output()
  activeChanged = new EventEmitter();

  @Output()
  editClicked = new EventEmitter();

  active: EntityMapItem;

  handleSelected(item: EntityMapItem){
    if (this.active && this.active.id == item.id){
      this.setActive(null, false);
    } else {
      this.setActive(item, false);
    }
  }

  setActive(item: EntityMapItem, silent: boolean) {
    this.active = item;
    if (!silent){
      this.activeChanged.emit(this.active);
    }
  }

  edit(item: EntityMapItem){
    this.editClicked.emit(item);
  }

}
