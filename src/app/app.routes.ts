import { LandingPageComponent } from './landing-page/landing-page.component';
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
  { path: '', component: LandingPageComponent },
  { path: 'admin', component: IndexComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/city', component: CityMapComponent, canActivate: [AuthGuard] },
  { path: 'admin/map/edit/:id', component: MapEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'admin/cityItem/:id/maps', component: MapsComponent, canActivate: [AuthGuard] },
  { path: 'admin/iosIcons', component: IosIconsComponent, canActivate: [AuthGuard] },
  { path: 'admin/itemKinds', component: ItemKindsComponent, canActivate: [AuthGuard] },



];

export const ROUTES_NAV = [
  { name: 'Home', path: '/admin' },
  { name: 'City', path: '/admin/city', useAsDefault: true },
  { name: 'Maps', path: '/admin/maps' }
];
