import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AndroidIconService } from './api/service/android-icon.service'
import { AppComponent } from './app.component';
import { AuthGuard } from "./_guards/auth-guard.service";
import { AuthService } from "./_guards/auth.service";
import { BrowserModule } from '@angular/platform-browser';
import { CityItemService } from './api/service/city-item.service'
import { CityMapComponent } from './city-map/city-map.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './dynamic-form/dynamic-form-field.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { IndexComponent } from './index/index.component';
import { InfoWindowComponent } from './city-map/info-window/info-window.component';
import { IosIconService } from './api/service/ios-icon.service'
import { IosIconsComponent } from "./icons/ios-icons.component";
import { ItemKindService } from './api/service/item-kind.service'
import { ItemKindsComponent } from "./item-kinds/item-kinds.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { LoginComponent } from './login/login.component';
import { MapEditComponent } from './map/map.edit.component';
import { MapItemService } from "./api/service/map-item.service";
import { MapService } from './api/service/map.service'
import { MapsComponent } from './maps/maps.component';
import { MaterialModule } from '@angular/material';
import { ROUTES } from './app.routes';
import { RootService } from './api/service/root.service'
import { ServiceFactory } from "./api/service-factory.service";
import { ServiceLocator } from "./service-locator.service";
import { UrlResourceService } from "./common/service/url-resource.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FlexLayoutModule,
    LandingPageModule
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
    MapItemService
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
