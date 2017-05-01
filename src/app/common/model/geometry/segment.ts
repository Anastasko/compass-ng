import {Point} from "./point";
import {Polygon} from "./polygon";
export class Segment {

  static RADIUS: number = 3;

  a: Point;
  b: Point;
  id: string;

  constructor(a: Point, b: Point, id: string){
    this.a = a;
    this.b = b;
    this.id = id;
  }

  length(){
    return this.a.distanceTo(this.b);
  }

}
