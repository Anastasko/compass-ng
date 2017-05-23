import {Component, OnInit, OnDestroy, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import { MapService } from '../../api/service/map.service';
import { EntityMap } from  '../../api/model/entity-map';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { config } from "../../config";
import { EntityMapItem } from "../../api/model/entity-map-item";
import { MapItemService } from "../../api/service/map-item.service";
import {MapItemsListComponent} from "../map-item-list/map-items-list.component";
import {utils} from '../../common/utils';
import {Geometry} from "../../common/utils/geometry";
import {Polygon} from "../../common/model/geometry/polygon";
import {Graph} from "../../common/utils/graph/graph";
import {Segment} from "../../common/model/geometry/segment";
import {Point} from "../../common/model/geometry/point";

@Component({
  selector: 'map-edit',
  templateUrl: 'map-edit.component.html',
  providers: [MapService]
})
export class MapEditComponent implements OnInit {

  @Input()
  map: EntityMap;

  @Output()
  itemsLoaded = new EventEmitter();
  @Output()
  svgLoaded = new EventEmitter();

  @ViewChild('mapItemForm') mapItemForm: any;

  @Input()
  mapItemsListComponent: MapItemsListComponent;

  private showForm: boolean = false;
  private hideMenu: boolean = true;
  private tooltip: any;
  private mapItemRadius = 8;
  private mapItems: EntityMapItem[];
  private svg: any;
  private transform: any = {
    x: 0,
    y: 0,
    k: 1
  };
  contextMenuItemIndex: number;
  prevPath: any;
  private initDone: boolean;
  svgNode: any;

  constructor(private _mapService: MapService,
              private mapItemService: MapItemService) {

  }

  ngOnInit() {
    this.tooltip = d3.select(".tooltip");
    this.map = new EntityMap(this.map);
    this.map.getMapItems().then((items: EntityMapItem[]) => {
      items.sort(utils.attrComparator('room'));
      this.mapItems = items;
      this.itemsLoaded.emit(this.mapItems);
    });
    this.loadSvgNode();
  }

  loadSvgNode() {
    let that = this;
    d3.xml(config.endpoint + this.map.image.url,
      function (error, documentFragment) {
        if (error) {
          console.log(error);
          return;
        }
        that.svgNode = documentFragment.getElementsByTagName("svg")[0];
        that.svgLoaded.emit(that.map.id);
      });
  }

  callback(item){
    if (item){
      this.mapItems.push(item);
    }
    this.showForm = false;
  }

  update(item: EntityMapItem) {
    this.showForm = true;
    this.mapItemForm.render(item);
  }

  add() {
    this.update(new EntityMapItem({}));
  }

  edit() {
    let mapItem = this.mapItems[this.contextMenuItemIndex];
    this.update(mapItem);
  }

  onRoomSelected(room){
    this.handleSelected(room);
  }

  toSVGpath(id: string){
    return 'room' + id;
  }

  fromSVGpath(id: string){
    let res = id.substr(4);
    return res;
  }

  clicked(event){
    let el = event.target;
    if (el.parentElement.id === 'rooms') {
      let id = el.id;
      let room = this.fromSVGpath(id);
      let managed = this.findByRoom(room);
      if (!managed){
          let newItem = new EntityMapItem({
            room: this.fromSVGpath(id),
            owner: {
              id: this.map.id
            }
          });
          this.update(newItem);
      } else {
        this.handleSelected(managed);
      }
    }
  }

  printText(p: Point, str: string, fontSize: number){
    let html = `<text x="${p.x}" y="${p.y}" font-family="Verdana" font-size="${fontSize}" fill="blue">${str}</text>`;
    this.svgNode.getElementById('labels').innerHTML += (html);
  }

  printDebugText(p: Point, str: string) {
    this.printText(p, str, 8);
  }

  isDebugMode(){
    return localStorage.getItem('debug') == 'true';
  }

  buildGraph(g: Graph){
    try {
      let routeId = 0;
      let children = this.svgNode.getElementById('routes').children;
      for(let c1 = 0; c1 < children.length; ++c1){
        let route = children[c1];
        if (!route.id){
          route.id = 'route-' + this.map.id + '-' + (++routeId);
        }
        let r1;
        if (route.tagName === 'path') {
          let d = route.getAttribute('d');
          r1 = Geometry.svgPathToPoints(d);
        } else if (route.tagName === 'line') {
          r1 = Geometry.svgLineToPoints(route);
        } else {
          throw "bad route tag name '" + route.tagName + "'";
        }
        let seg = new Segment(r1[0], r1[1], route.id, this.map.id);
        g.addEdge(seg);
      }

    } catch (e) {
      console.error("problemos with " + this.map.floor + " floor");
      debugger;
    }
  }

  handleSelected(item: EntityMapItem){
    let path = this.toSVGpath(item.room);
    let el = document.getElementById(path);
    if (this.prevPath) {
      this.makeUnselected(this.prevPath);
    }
    if (item != null && el == null){
      alert('Will not be hightlited. Path #' + path + ' is not present in svg.');
      item = null;
    }

    if (item == null || this.prevPath == el){
      this.prevPath = null;
      this.mapItemsListComponent.setActive(null, true);
    } else {
      this.prevPath = el;
      this.makeSelected(el);
      this.mapItemsListComponent.setActive(item, true);
    }
  }

  private findByRoom(room: string) {
    let res = null;
    this.mapItems.forEach(item => {
      if (item.room == room){
        res = item;
      }
    });
    return res;
  }

  makeSelected(el){
    el.setAttribute('was-fill', el.style.fill);
    el.style.fill = '#87CEFA';
  }

  makeUnselected(el){
    el.style.fill = el.getAttribute('was-fill');
    el.setAttribute('was-fill', '');
  }

  isSelected(el){
    return el.getAttribute('was-fill') && el.getAttribute('was-fill').length > 0;
  }

  initMap() {
    if (this.initDone){
      return;
    }
    let that = this;
    this.svg = d3.select("#map-" + this.map.id)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .call(d3.zoom().on("zoom", function () {
        that.hideMenu = true;
        let transform = d3.event.transform;
        that.transform = transform;
        that.svg.attr("transform", 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
        d3.selectAll('.map-item').attr('r', that.mapItemRadius / transform.k);
      }))
      .append("g");

    if (!this.svg){
      console.log('not at this time. The svg is not initialized. To be rendered lazily later.');
    } else {
      this.initDone = true;
    }

    let node: any = that.svg.node();
    node.appendChild(this.svgNode);
    that.initRoomNumbers();
  }

  getRoomsFromSvg(): Element[] {
    let res = [];
    let rooms = document.getElementById('rooms').children;
    for(let ind = 0; ind < rooms.length; ++ind){
      let room = rooms[ind];
      res.push(room);
    }
    return res;
  }

  initRoomNumbers() {
    try {
      this.getRoomsFromSvg().forEach(r => {
        let roomNumber = this.fromSVGpath(r.id);
        let room = this.findByRoom(roomNumber);
        if (room != null){
          let polygon = new Polygon(Geometry.svgPolygonToPoints(r.getAttribute('points')));
          let c = polygon.center();
          c.x -= 15;
          this.printText(c, roomNumber, 14);
        }
      });
    } catch (e) {
      console.error('cant init room numbers on map ' + this.map.id + '(floor ' + this.map.floor + ')');
    }
  }

}
