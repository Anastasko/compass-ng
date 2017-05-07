import { NgModule, Injector } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CityMapComponent } from './city-map/city-map.component';
import { IndexComponent } from './index/index.component';
import { MapsComponent } from './maps/maps.component';
import { MapEditComponent } from './map/map.edit.component';
import { LoginComponent } from './login/login.component';
import { ROUTES } from './app.routes';

import { ServiceLocator } from "./service-locator.service";
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './dynamic-form/dynamic-form-field.component';
import { AuthGuard } from "./_guards/auth-guard.service";
import { AuthService } from "./_guards/auth.service";

import { ItemKindService } from './api/service/item-kind.service'
import { IosIconService } from './api/service/ios-icon.service'
import { AndroidIconService } from './api/service/android-icon.service'
import { RootService } from './api/service/root.service'
import { CityItemService } from './api/service/city-item.service'
import { MapService } from './api/service/map.service'
import { ServiceFactory } from "./api/service-factory.service";
import { InfoWindowComponent } from './city-map/info-window/info-window.component';
import { UrlResourceService } from "./common/service/url-resource.service";
import { MapItemService } from "./api/service/map-item.service";
import { IosIconsComponent } from "./icons/ios-icons.component";
import { ItemKindsComponent } from "./item-kinds/item-kinds.component";
import {FacultyService} from "./api/service/faculty.service";
import {FacultiesComponent} from "./faculties/faculties.component";
import {MapItemsListComponent} from "./map/map-item-list/map-items-list.component";
import { CityItemMapsComponent } from './maps/city-item-maps/city-item-maps.component';
import {ItemIconService} from "./common/service/item-icon.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    CityMapComponent,
    IndexComponent,
    LoginComponent,
    MapsComponent,
    MapEditComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    InfoWindowComponent,
    IosIconsComponent,
    ItemKindsComponent,
    FacultiesComponent,
    MapItemsListComponent,
    CityItemMapsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard, AuthService,
    ServiceFactory,
    ItemKindService,
    IosIconService,
    AndroidIconService,
    RootService,
    CityItemService,
    MapService,
    UrlResourceService,
    MapItemService,
    FacultyService,
    ItemIconService
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
