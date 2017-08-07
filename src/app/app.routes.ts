import { Routes } from '@angular/router';
import { CityMapComponent } from './city-map/city-map.component';
import { IndexComponent } from './index/index.component';
import { MapsComponent } from './maps/maps.component';
import { MapsEditComponent } from './map/maps-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth-guard.service';
import { IosIconsComponent } from "./icons/ios-icons.component";
import { ItemKindsComponent } from "./item-kinds/item-kinds.component";
import {FacultiesComponent} from "./faculties/faculties.component";

export const ROUTES: Routes = [
  { path: '', redirectTo: '/271/maps', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {
    path: 'city', component: CityMapComponent, canActivate: [AuthGuard]
  },
  { path: ':id/maps', component: MapsEditComponent },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'cityItem/:id/maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'iosIcons', component: IosIconsComponent, canActivate: [AuthGuard] },
  { path: 'itemKinds', component: ItemKindsComponent, canActivate: [AuthGuard] },
  { path: 'faculties', component: FacultiesComponent, canActivate: [AuthGuard]},
];

export const ROUTES_NAV = [
  { name: 'Home', path: '/' },
  { name: 'City', path: '/city', useAsDefault: true },
  { name: 'Maps', path: '/maps' }
];
