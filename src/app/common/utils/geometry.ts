import {Point} from "../model/geometry/point";
import {Polygon} from "../model/geometry/polygon";
export class Geometry {

  static getAngle(p1: Point, p2: Point) {
    let ang1 = Math.atan2(p1.y, p1.x);
    let ang2 = Math.atan2(p2.y, p2.x);
    let res = ang2 - ang1;
    if (res < 0)
      res += 2 * Math.PI;
    if (res > Math.PI)
      res -= 2 * Math.PI;
    return res;
  }

  static addPoint(points: Point[], isLowercase: boolean, point: Point){
    if (isLowercase && points.length > 0){
        point.x += points[points.length-1].x;
        point.y += points[points.length-1].y;
    }
    points.push(point);
  }

  static addPoints(points: Point[], letter: string, arr: string[]){
    let isLowercase = letter == letter.toLowerCase();
    letter = letter.toLowerCase();
    let prevP = points.length ? points[points.length-1] : new Point(0,0);
    let point : Point;
    if (letter == 'v'){
      if (isLowercase) {
        point = new Point(0, arr.reduce((a, b) => (+a) + (+b), 0));
        Geometry.addPoint(points, isLowercase, point);
      } else {
        for(let i=0; i<arr.length; i++) {
          point = new Point(prevP.x, +arr[i]);
          Geometry.addPoint(points, isLowercase, point);
        }
      }
    } else if (letter == 'h') {
      if (isLowercase){
        point = new Point(arr.reduce((a,b) => (+a)+(+b), 0), 0);
        Geometry.addPoint(points, isLowercase, point);
      } else {
        for(let i=0; i<arr.length; i++) {
          point = new Point(+arr[i], prevP.y);
          Geometry.addPoint(points, isLowercase, point);
        }
      }
    } else if (letter == 'c') {
      point = new Point(+arr[arr.length-2], +arr[arr.length-1]);
      Geometry.addPoint(points, isLowercase,point);
    } else if (letter == 'm' || letter == 'l') {
      for(let i=0; i<arr.length-1; i+=2) {
        point = new Point(+arr[i], +arr[i + 1]);
        Geometry.addPoint(points, isLowercase, point);
      }
    } else if (letter == 'z'){
    } else {
      throw ("bad letter command '" + letter + "'");
    }
  }

  static svgPathToPoints(d: string): Point[] {
    let points = []
    var commands = d.split(/(?=[mvhlczMVHLCZ])/);
    for(let command of commands){
      // console.log(command);
      let ind = 0;
      while (command.indexOf('-', ind) != -1){
        let i2 = command.indexOf('-', ind);
        command = command.substr(0, i2) + ',' + command.substr(i2);
        ind = command.indexOf('-', ind)+1;
      }
      let arr = command.trim().split(/,| /);
      if (arr[0].length != 1){
        arr.splice(0,0,arr[0].charAt(0))
        arr[1] = arr[1].slice(1);
      }
      let letter = arr[0];
      arr.shift();
      Geometry.addPoints(points, letter, arr);
    }
    return points;
  }

  static svgPolygonToPoints(pointsAttr: string): Point[] {
    let points = []
    var pairs = pointsAttr.split(' ');
    for(let pair of pairs){
      if (pair.length){
        let coords = pair.split(',');
        points.push(new Point(+coords[0], +coords[1]));
      }
    }
    return points;
  }

  static svgLineToPoints(route: Element) {
    let points = [];
    [1, 2].forEach(i => {
      let x = +route.getAttribute('x'+i);
      let y = +route.getAttribute('y'+i);
      points.push(new Point(x, y));
    });
    return points;
  }
}
