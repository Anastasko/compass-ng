import {Geometry} from "../../utils/geometry";
export class Point {

  x: number;
  y: number;

  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }

  distanceTo(p: Point): number {
    return Math.sqrt((this.x - p.x)*(this.x - p.x) + (this.y - p.y)*(this.y - p.y));
  }

}
