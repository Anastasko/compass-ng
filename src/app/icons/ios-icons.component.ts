import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../api/service/map.service';
import { EntityMap } from '../api/model/entity-map';
import { CityItemService } from "../api/service/city-item.service";
import { Entity } from "../common/model/entity";
import { EntityIosIcon } from "../api/model/entity-ios-icon";
import { IosIconService } from "../api/service/ios-icon.service";
import { config } from '../config';

@Component({
  selector: 'x-map',
  templateUrl: 'ios-icons.component.html'
})
export class IosIconsComponent {

  icons: EntityIosIcon[];
  config: any = config;

  @ViewChild('iosIconForm') iosIconForm: any;
  private showForm: boolean = false;

  private sub: any;

  constructor(private iosIconService: IosIconService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.iosIconService.findAll()
      .then((icons: EntityIosIcon[]) => {
        this.icons = icons;
      });
  }

  callback(item) {
    if (item) {
      this.icons.push(item);
    }
    this.showForm = false;
  }

  update(map: EntityIosIcon) {
    this.showForm = true;
    this.iosIconForm.render(map);
  }

  add() {
    this.update(new EntityIosIcon({}));
  }

}
