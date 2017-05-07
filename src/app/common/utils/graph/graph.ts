import {Vertice} from "./vertice";
import {Segment} from "../../model/geometry/segment";
import {Point} from "../../model/geometry/point";
import {Polygon} from "../../model/geometry/polygon";
export class Graph {

  edges = new Map<number, {v: number, edge: Segment}[]>();
  vertices : Point[] = [];

  private findPoint(a: Point): number {
    for(let ind = 0; ind < this.vertices.length; ++ind){
      if (this.vertices[ind].distanceTo(a) < Segment.RADIUS){
        return ind;
      }
    }
    this.vertices.push(a);
    return this.vertices.length-1;
  }

  private _addEdge(edge: Segment) {
    let A = this.findPoint(edge.a);
    let B = this.findPoint(edge.b);
    if (!this.edges.has(A)) {
      this.edges.set(A, []);
    }
    this.edges.get(A).push({
      v: B,
      edge: edge
    });
  }

  addEdge(edge: Segment){
    this._addEdge(edge);
    let tmp = edge.a;
    edge.a = edge.b;
    edge.b = tmp;
    this._addEdge(edge);
  }

  toString(){
    let s = "";
    this.edges.forEach((arr, k) => {
      s += "vertice: " + k + "\n";
      s += arr.map(ar => ar.v).join(" ")+'\n';
    });
    return s;
  }

  nearestVertice(p: Polygon): number {
    let res = -1;
    this.vertices.forEach((v,index) => {
      if (res == -1 || p.distanceTo(v) < p.distanceTo(this.vertices[res])){
        res = index;
      }
    });
    return res;
  }

  dijkstra(start: number, fin: number): Segment[] {
    let dist = new Map<number, number>();
    let used = new Map<number, boolean>();
    let from = new Map<number, {seg: Segment, from: number}>();
    this.vertices.forEach((_,v) => {
      dist.set(v, Infinity);
      used.set(v, false);
      from.set(v, null);
    });
    dist.set(start, 0);
    while (used.get(fin) == false) {
      let cur = null;
      this.vertices.forEach((_, v) => {
        if (!used.get(v) && (cur === null || dist.get(cur) > dist.get(v))) {
          cur = v;
        }
      });
      // console.log(cur);
      if (cur == null || dist.get(cur) == Infinity) {
        return undefined;
      }
      used.set(cur, true);
      this.edges.get(cur).forEach((node) => {
        let to = node.v;
        let w = node.edge.length();
        if (dist.get(cur) + w < dist.get(to)) {
          dist.set(to, dist.get(cur) + w);
          from.set(to, {seg: node.edge, from: cur});
        }
      });
    }
    let res : Segment[] = [];
    let v = from.get(fin);
    while (v != null){
      res.push(v.seg);
      v = from.get(v.from);
    }
    res.reverse();
    return res;
  }

}
