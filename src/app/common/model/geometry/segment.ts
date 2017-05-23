import {Point} from "./point";
import {Polygon} from "./polygon";
export class Segment {

  static RADIUS: number = 3;

  a: Point;
  b: Point;
  id: string;
  layer: number;

  constructor(a: Point, b: Point, id: string, layer: number){
    this.a = a;
    this.b = b;
    this.id = id;
    this.layer = layer;
  }

  length(){
    return this.a.distanceTo(this.b);
  }

}
