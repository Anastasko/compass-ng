import { Routes } from '@angular/router';
import { CityMapComponent } from './city-map/city-map.component';
import { IndexComponent } from './index/index.component';
import { MapsComponent } from './maps/maps.component';
import { MapEditComponent } from './map/map.edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth-guard.service';
import { IosIconsComponent } from "./icons/ios-icons.component";
import { ItemKindsComponent } from "./item-kinds/item-kinds.component";

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'city', component: CityMapComponent, canActivate: [AuthGuard]
  },
  { path: 'map/edit/:id', component: MapEditComponent, canActivate: [AuthGuard] },
  { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'cityItem/:id/maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'iosIcons', component: IosIconsComponent, canActivate: [AuthGuard] },
  { path: 'itemKinds', component: ItemKindsComponent, canActivate: [AuthGuard] },
];

export const ROUTES_NAV = [
  { name: 'Home', path: '/' },
  { name: 'City', path: '/city', useAsDefault: true },
  { name: 'Maps', path: '/maps' }
];
