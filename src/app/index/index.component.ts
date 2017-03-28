import { AuthService } from './../_guards/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../api/service/map.service';
import { ServiceFactory } from "../api/service-factory.service";
import { Router } from "@angular/router";


@Component({
  selector: 'my-app',
  templateUrl: `./index.component.html`
})
export class IndexComponent {
  isLogin: boolean = true;

  constructor(private mapService: MapService,
    private serviceFactory: ServiceFactory, private _router: Router,
    private authService: AuthService) {

  }
  ngOnInit(): void {
    this._router.events.subscribe((url) => {
      this.isLogin = (url.url === 'admin/login');
    });
  }

}
