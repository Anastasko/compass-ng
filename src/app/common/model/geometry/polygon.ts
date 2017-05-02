import {Point} from "./point";
import {Geometry} from "../../utils/geometry";
export class Polygon {

  points: Point[];

  constructor(points: Point[]){
    this.points = points;
  }

  containsPoint(p: Point) {
    let n = this.points.length;
    let angle = 0;
    for (let i = 0; i < n; ++i) {
      let v1 = new Point(this.points[i].x - p.x, this.points[i].y - p.y);
      let v2 = new Point(this.points[(i + 1) % n].x - p.x, this.points[(i + 1) % n].y - p.y);
      angle += Geometry.getAngle(v1, v2);
    }
    return Math.abs(Math.abs(angle) - 2 * Math.PI) < 1e-4;
  }

  distanceTo(p: Point){
    if (this.containsPoint(p)) {
      return 0;
    }
    let res = Infinity;
    this.points.forEach(po => {
      res = Math.min(res, po.distanceTo(p));
    });
    return res;
  }

  center(): Point {
    if (this.points.length == 0){
      throw "points.length == 0";
    }
    let l = Infinity;
    let d = Infinity;
    let r = -Infinity;
    let u = -Infinity;
    this.points.forEach(p => {
      l = Math.min(l, p.x);
      d = Math.min(d, p.y);
      r = Math.max(r, p.x);
      u = Math.max(u, p.y);
    });
    return new Point((l+r)/2, (u+d)/2);
  }

}
