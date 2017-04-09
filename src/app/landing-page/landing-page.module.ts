import { AppModule } from './../app.module';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpModule } from '@angular/http';
import { LandingPageComponent } from './landing-page.component';
import { NgModule } from '@angular/core';
import { LandingMapComponent } from './landing-map/landing-map.component';
import { BuildingsMenuComponent } from './buildings-menu/buildings-menu.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        LandingPageComponent,
        HeaderComponent,
        FooterComponent,
        LandingMapComponent,
        BuildingsMenuComponent
    ],
    providers: [

    ]
})
export class LandingPageModule {

}
