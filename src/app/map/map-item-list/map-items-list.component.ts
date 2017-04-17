import { Component, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { MapService } from '../../api/service/map.service';
import { EntityMap } from  '../../api/model/entity-map';
import { Routes, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import * as d3 from 'd3';
import { config } from "../../config";
import { Entity } from "../../common/model/entity";
import { EntityMapItem } from "../../api/model/entity-map-item";
import { MapItemService } from "../../api/service/map-item.service";
import {utils} from '../../common/utils';

@Component({
  selector: 'map-items-list',
  templateUrl: `./map-items-list.component.html`,
  providers: [MapService],
  styleUrls: [
    'map-item-list.css'
  ]
})
export class MapItemsListComponent {

  rooms: EntityMapItem[] = [];

  init(map: EntityMap) {
    map.getMapItems().then(items => {
      items.sort(utils.attrComparator('room'));
      this.rooms = items;
    });
  }

}
