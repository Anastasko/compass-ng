import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../_guards/auth.service";
import { ROUTES_NAV } from "../app.routes";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent {

  constructor(private _router: Router,
              private _auth: AuthService) {
  }

  ROUTES_NAV = ROUTES_NAV;

}
