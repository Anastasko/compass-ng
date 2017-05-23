import {Point} from "../../model/geometry/point";

export class Vertice {

  point: Point;
  layer: number;

  constructor(point: Point, layer: number){
    this.point = point;
    this.layer = layer;
  }

  getPoint1(){
    return this.point;
  }

}
