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
  selectedTab = 0;
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
          let text = this.g.toString();

          components.forEach(c1 => {

          });

          if (this.isDebugMode()){
            let g = this.g;
            g.vertices.forEach((v,k) => {
              let ind = this.findIndex(v.layer);
              that.mapComponents.toArray()[ind].printDebugText(v.getPoint1(), ''+k);
            });
          }

        });
        this.maps = maps;
      });
    });
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

  onRoomSelected(item: EntityMapItem, silent: boolean){
    let ind = this.findIndex(item.owner.id);
    this.selectedTab = ind;
    this.mapComponents.toArray()[ind].onRoomSelected(item);
    this.buildRoute(item);
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

    this.prevEl = el;

    let g = this.g;

    let start = g.nearestVertice(polygon1, +this.prevEl.getAttribute('layer'));
    let fin = g.nearestVertice(polygon2, +el.getAttribute('layer'));
    console.log('A='+start+' B='+fin);
    let route = g.dijkstra(start, fin);

    console.log(route);
    if (route === undefined){
      alert("route not found! try debug mode.");
      return;
    }

    let children = document.getElementById('routes').children;
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

}
