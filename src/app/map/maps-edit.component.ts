import {Component, OnInit, OnDestroy, Output, EventEmitter, QueryList, ViewChildren, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CityItemService} from "../api/service/city-item.service";
import {EntityCityItem} from "../api/model/entity-city-item";
import {EntityMap} from "../api/model/entity-map";
import {utils} from "../common/utils";
import {EntityMapItem} from "../api/model/entity-map-item";
import {MapEditComponent} from "./map-edit/map-edit.component";
import {MapItemsListComponent} from "./map-item-list/map-items-list.component";
import {Graph} from "../common/utils/graph/graph";
import {Polygon} from "../common/model/geometry/polygon";
import {Geometry} from "../common/utils/geometry";
import {Point} from "../common/model/geometry/point";
import {Vertice} from "../common/utils/graph/vertice";
import {Segment} from "../common/model/geometry/segment";

@Component({
  selector: 'app-maps-edit',
  templateUrl: 'maps-edit.component.html',
  styleUrls: ['maps-edit.component.css']
})
export class MapsEditComponent implements OnInit, OnDestroy {

  private sub: any;
  maps: EntityMap[];
  mapItems: EntityMapItem[] = [];
  mapReady = [];
  selectedTab = 1;
  g: Graph;

  @ViewChild(MapItemsListComponent) mapItemsListComponent: MapItemsListComponent;

  @ViewChildren(MapEditComponent)
  mapComponents: QueryList<MapEditComponent>;
  private prevEl: any;

  constructor(
    private route: ActivatedRoute) {
  }

  isDebugMode(){
    return localStorage.getItem('debug') == 'true';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      let owner = new EntityCityItem({id: id});
      owner.getMaps().then(maps => {
        maps.sort(utils.attrComparator('floor'));
        this.g = new Graph();
        maps.forEach(m => {
          let defer = this.deferedPromise();
          defer.promise = defer.promise.then((m) => {
            m.buildGraph(this.g);
            return m;
          });
          this.mapReady.push(defer);
        });
        let that = this;
        Promise.all(this.mapReady.map(mr => mr.promise))
          .then((components) => {

          let portalsMap = {};
          components.forEach(c1 => {
            let portals = c1.svgNode.getElementById('portals');
            if (portals){
              for(let p = 0; p < portals.children.length; ++p) {
                let po = portals.children.item(p);
                portalsMap[po.id] = portalsMap[po.id] || [];
                let point = new Point(+po.attributes.cx.value, +po.attributes.cy.value);
                portalsMap[po.id].push(new Vertice(point, c1.map.id));
              }
            }
          });
          this.processPortals(portalsMap);

          let text = this.g.toString();

          if (this.isDebugMode()){
            let g = this.g;
            g.vertices.forEach((v,k) => {
              let ind = this.findIndex(v.layer);
              that.mapComponents.toArray()[ind].printDebugText(v.getPoint1(), ''+k);
            });
          }

          this.selectedTab = 1;

        });
        this.maps = maps;
      });
    });
  }

  processPortals(portalsMap: any){
    Object.keys(portalsMap).forEach(key => {
      let list = portalsMap[key];
      list.forEach(p1 => {
        list.forEach(p2 => {
          this.g._addEdge(new Segment(p1, p2, ''));
        })
      })
    })
  }

  deferedPromise() {
    let p = {
      resolve: null,
      promise: null,
      reject: null
    };
    p.promise = new Promise((res, rej) => {
      p.resolve = res;
      p.reject = rej;
    });
    return p;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onItemsLoaded(items){
    this.mapItems.push(...items);
  }

  onTabClick(tab){
    let ind = tab.index;
    this.selectedTab = ind;
    let cmp = this.mapComponents.toArray()[ind];
    this.mapReady[ind].promise.then(() => {
      cmp.initMap();
    });
  }

  onRoomSelected(item: EntityMapItem){
    if (!item){
      return;
    }
    let ind = this.findIndex(item.owner.id);
    this.selectedTab = ind;
    this.buildRoute(item);
  }

  onListRoomSelected(item){
    let ind = this.findIndex(item.owner.id);
    this.mapComponents.toArray()[ind].onRoomSelected(item, true);
    this.onRoomSelected(item);
  }

  onSvgRoomSelected(item){
    this.mapItemsListComponent.onRoomSelected(item, true);
    this.onRoomSelected(item);
  }


  onSvgLoaded(id){
    let ind = this.findIndex(id);
    let cmp = this.mapComponents.toArray()[ind];
    this.mapReady[ind].resolve(cmp);
  }

  findIndex(id): number {
    let res;
    this.maps.forEach((m, i) => {
      if (m.id === id){
        res = i;
      }
    });
    return res;
  }

  getComponentWithItem(item: EntityMapItem){
    let ind = this.findIndex(item.owner.id);
    return this.mapComponents.toArray()[ind];
  }

  buildRoute(toItem: EntityMapItem){

    let node = this.getComponentWithItem(toItem).svgNode;
    let el = node.getElementById('room' + toItem.room);
    el.setAttribute('layer', toItem.owner.id);

    if (!this.prevEl){
      this.prevEl = el;
      return;
    }

    let polygon1 = new Polygon(Geometry.svgPolygonToPoints(this.prevEl.getAttribute('points')));
    let polygon2 = new Polygon(Geometry.svgPolygonToPoints(el.getAttribute('points')));

    let g = this.g;

    let start = g.nearestVertice(polygon1, +this.prevEl.getAttribute('layer'));
    let fin = g.nearestVertice(polygon2, +el.getAttribute('layer'));

    this.prevEl = el;
    console.log('A='+start+' B='+fin);

    let route = g.dijkstra(start, fin);

    console.log(route);
    if (route === undefined){
      alert("route not found! try debug mode.");
      return;
    }

    this.mapComponents.toArray().forEach(cmp => {
      cmp.routeContainer.fromRoutes(route);
    });
    this.mapComponents.toArray()[this.selectedTab].routeContainer.build();

  }

}
