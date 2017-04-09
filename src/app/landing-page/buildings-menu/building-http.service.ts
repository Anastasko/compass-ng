import { Injectable } from '@angular/core';

@Injectable()
export class BuildingHttpService {

  constructor() { }

  getBuildings() {
    return [{
      name: "Головний корпус",
      id: 1
    }, {
      name: "Біологічний факультет",
      id: 2
    }, {
      name: "Фізичний факультет",
      id: 3
    }, {
      name: "Геологічний факультет",
      id: 4
    }, {
      name: "Економічний факультет",
      id: 5
    }]
  }

}
