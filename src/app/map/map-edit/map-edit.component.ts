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
  providers: [MapService],
  styleUrls: [
    'map-item-tooltip.css'
  ]
})
export class MapEditComponent implements OnInit {

  @Input()
  map: EntityMap;

  @Output()
  itemsLoaded = new EventEmitter();

  @ViewChild('mapItemForm') mapItemForm: any;

  @ViewChild(MapItemsListComponent) mapItemsListComponent: MapItemsListComponent;

  private showForm: boolean = false;
  private hideMenu: boolean = true;
  private hideMapMenu: boolean = true;
  private dragging: boolean = false;
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
  private prevEl: any;
  private initDone: boolean;

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

  enUkLetters = [
    {en: 'a', uk: 'а'},
    {en: 'b', uk: 'б'},
    {en: 'v', uk: 'в'},
    {en: 'g', uk: 'г'},
    {en: 'd', uk: 'д'},
    {en: 'k', uk: 'к'}
  ];

  toSVGpath(room: string){
    let res = room;
    this.enUkLetters.forEach(l => {
      res = res.replace(l.uk, l.en);
    });
    return 'path' + res;
  }

  fromSVGpath(id: string){
    let res = id.substr(4);
    this.enUkLetters.forEach(l => {
      res = res.replace(l.en, l.uk);
    });
    return res;
  }

  clicked(event){
    let el = event.target;
    let name = el.nodeName;
    if (name === 'path') {
      let id = el.id;
      let room = this.fromSVGpath(id);
      let managed = this.findByRoom(room);
      if (!managed){
        if (el.parentElement.id == 'rooms'){
          let newItem = new EntityMapItem({
            room: this.fromSVGpath(id),
            owner: {
              id: this.map.id
            }
          });
          this.update(newItem);
        }
      } else {
        this.handleSelected(managed);
      }
    }
  }

  printText(p: Point, str: string, fontSize: number){
    let html = `<text x="${p.x}" y="${p.y}" font-family="Verdana" font-size="${fontSize}" fill="blue">${str}</text>`;
    document.getElementById('labels').innerHTML += (html);
  }

  printDebugText(p: Point, str: string) {
    this.printText(p, str, 8);
  }

  isDebugMode(){
    return localStorage.getItem('debug') == 'true';
  }

  buildRoute(el: any){

    if (!this.prevEl){
      this.prevEl = el;
      return;
    }

    let children = document.getElementById('routes').children;
    let g = new Graph();
    for(let c1 = 0; c1 < children.length; ++c1){
      let route = children[c1];
      let d = route.getAttribute('d');
      let r1 = Geometry.svgPathToPoints(d);
      if (this.isDebugMode()) {
        console.log(d);
        console.log('(' + r1[0].x + ',' + r1[0].y + ") - (" + r1[1].x + ',' + r1[1].y + ')');
      }
      let seg = new Segment(r1[0], r1[1], route.id);
      g.addEdge(seg);
    }

    if (this.isDebugMode()){
      g.vertices.forEach((v,k) => {
        this.printDebugText(v, ''+k);
      });
    }

    let polygon1 = new Polygon(Geometry.svgPathToPoints(this.prevEl.getAttribute('d')));
    let polygon2 = new Polygon(Geometry.svgPathToPoints(el.getAttribute('d')));

    this.prevEl = el;

    if (this.isDebugMode()) {
      console.log(g.toString());
    }
    let start = g.nearestVertice(polygon1);
    let fin = g.nearestVertice(polygon2);
    console.log('A='+start+' B='+fin);
    let route = g.dijkstra(start, fin);
    console.log(route);
    if (route === undefined){
      alert("route not found! try debug mode.");
      return;
    }
    for(let c1 = 0; c1 < children.length; ++c1) {
      let rout : Element = children.item(c1);
      document.getElementById(rout.id).style.opacity = this.isDebugMode() ? '0.3' : '0';
    }
    document.getElementById('routes').style.display = 'inline';
    route.forEach((r,ind) => {
      let routeEl = document.getElementById(r.id);
       setTimeout(() => {
        routeEl.style.opacity = '1';
      }, ind*100);
    });

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

    if (item) this.buildRoute(el);

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

    d3.xml(config.endpoint + this.map.image.url,
      function (error, documentFragment) {
        if (error) {
          console.log(error);
          return;
        }
        try {
          var svgNode = documentFragment
            .getElementsByTagName("svg")[0];
          let node: any = that.svg.node();
          node.appendChild(svgNode);

          try {
            that.initMapItems();
          } catch (e) {
            console.error('cant init map items for map ' + that.map.id);
          }

          try {
            that.initRoomNumbers();
          } catch (e) {
            console.error('cant init room numbers on map ' + that.map.id);
          }

        } catch (e) {
          console.error('ops');
        }


      });
    d3.select('#map').on('click', () => {
      that.hideTooltipAndMenu();
    });
  }

  initMapItems() {
    let that = this;
    this.svg.selectAll(".map-item")
      .data(this.mapItems)
      .enter().append("circle")
      .attr("data-index", (v, i) => {
        return i;
      })
      .on("click", v => {
        that.tooltip
          .text(v.id)
          .style("left", (that.transform.x + v.x * that.transform.k - 30) + "px")
          .style("top", (70 + that.transform.y + v.y * that.transform.k - 12) + "px")
          .style("display", "block");
        d3.event.stopPropagation();
      })
      .on("contextmenu", function () {
        let position = d3.mouse(this);
        that.contextMenuItemIndex = this.dataset.index;
        that.hideMenu = false;
        d3.select('#map_item_menu')
          .style('position', 'absolute')
          .style('left', (that.transform.x + position[0] * that.transform.k) + "px")
          .style('top', (85 + that.transform.y + position[1] * that.transform.k) + "px");
        d3.event.preventDefault();
      })
      .attr("class", "map-item")
      .attr("cx", function (d: any) {
        return d.x;
      })
      .attr("cy", function (d: any) {
        return d.y;
      })
      .attr("r", this.mapItemRadius)
      .style("fill", 'orange')
      .style("cursor", "move")
      .call(d3.drag()
        .on("start", function () {
          that.dragging = true;
          that.hideTooltipAndMenu();
          d3.select(this).raise().style("fill", 'green');
        })
        .on("drag", function (d: any) {
          d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        })
        .on("end", function () {
          d3.select(this).style("fill", 'orange');
          that.dragging = false;
        }))
      .on("mouseover", function () {
        if (!that.dragging) {
          d3.select(this).style("fill", 'orangered');
        }
      })
      .on("mouseout", function () {
        if (!that.dragging) {
          d3.select(this).style("fill", "orange");
        }
      });
  }


  hideTooltip() {
    this.tooltip.style("display", "none");
  }

  hideTooltipAndMenu() {
    this.hideTooltip();
    this.hideMenu = true;
    this.hideMapMenu = true;
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
    this.getRoomsFromSvg().forEach(r => {
      let roomNumber = this.fromSVGpath(r.id);
      let room = this.findByRoom(roomNumber);
      if (room != null){
        let polygon = new Polygon(Geometry.svgPathToPoints(r.getAttribute('d')));
        let c = polygon.center();
        c.x -= 15;
        this.printText(c, roomNumber, 14);
      }
    })
  }

}
