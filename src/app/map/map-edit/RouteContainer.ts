import {MapEditComponent} from "./map-edit.component";
import {Segment} from "../../common/model/geometry/segment";

export default class RouteContainer {

  private routes: Segment[] = [];

  private owner: MapEditComponent;

  constructor(comp: MapEditComponent){
    this.owner = comp;
  }

  build(){
    let children = document.getElementById('routes').children;
    for(let c1 = 0; c1 < children.length; ++c1) {
      let rout : Element = children.item(c1);
      document.getElementById(rout.id).style.opacity = this.owner.isDebugMode() ? '0.3' : '0';
    }
    document.getElementById('routes').style.display = 'inline';
    this.routes.forEach((r,ind) => {
      let routeEl = document.getElementById(r.id);
      setTimeout(() => {
        routeEl.style.opacity = '1';
      }, ind*100);
    });
  }

  fromRoutes(routes){
    this.routes = routes.filter(r => r.b.layer == this.owner.map.id && r.a.layer == this.owner.map.id);
    return this;
  }

}
