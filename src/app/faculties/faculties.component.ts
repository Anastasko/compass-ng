import {Component, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {MapService} from '../api/service/map.service';
import {EntityMap} from '../api/model/entity-map';
import {CityItemService} from "../api/service/city-item.service";
import {Entity} from "../common/model/entity";
import {config} from '../config';
import {EntityFaculty} from "../api/model/entity-faculty";
import {FacultyService} from "../api/service/faculty.service";

@Component({
  selector: 'x-map',
  templateUrl: 'faculties.component.html'
})
export class FacultiesComponent {

  faculties: EntityFaculty[];
  config: any = config;

  @ViewChild('facultyForm') facultyForm: any;
  private showForm: boolean = false;

  private sub: any;

  constructor(private facultyService: FacultyService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
      this.facultyService.findAll()
        .then((faculties: EntityFaculty[]) => {
          this.faculties = faculties;
        });
  }

  callback(item){
    if (item){
      this.faculties.push(item);
    }
    this.showForm = false;
  }

  update(item: EntityFaculty) {
    this.showForm = true;
    this.facultyForm.render(item);
  }

  add() {
    this.update(new EntityFaculty({}));
  }

}
