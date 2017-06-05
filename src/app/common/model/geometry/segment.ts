import {Point} from "./point";
import {Polygon} from "./polygon";
import {Vertice} from "../../utils/graph/vertice";
export class Segment {

  static RADIUS: number = 3;

  a: Vertice;
  b: Vertice;
  id: string;

  constructor(a: Vertice, b: Vertice, id: string){
    this.a = a;
    this.b = b;
    this.id = id;
  }

  length(){
    if (this.a.layer != this.b.layer){
      return 0;
    }
    return this.a.point.distanceTo(this.b.point);
  }

}
