import {Component, OnInit, NgZone, ViewChild, OnDestroy} from '@angular/core';
import { GeoCoder } from './geo-coder';
import { EntityCityItem } from '../api/model/entity-city-item';
import { CityItemService } from '../api/service/city-item.service';
import { Observable } from "rxjs";
import { InfoWindowComponent } from "./info-window/info-window.component";
import { ItemKindService } from "../api/service/item-kind.service";
import { EntityItemKind } from "../api/model/entity-item-kind";
import { AndroidIconService } from "../api/service/android-icon.service";
import { IosIconService } from "../api/service/ios-icon.service";
import { EntityIosIcon } from "../api/model/entity-ios-icon";
import { EntityMap } from "../api/model/entity-map";
import { config } from "../config";
import { EntityAndroidIcon } from "../api/model/entity-android-icon";
import {ItemIconService} from "../common/service/item-icon.service";
import {ActivatedRoute} from "@angular/router";

declare var google: any;

@Component({
  selector: 'city-map',
  template: ` <div [hidden]="showForm" id="map"></div>
                <info-window (edit)="edit($event)" [map]="map"></info-window>
                <dynamic-form #cityItemForm
                   [hidden]="!showForm"
                   [service]="_cityItemService"
                   (callback)="callback()">
                </dynamic-form>
              `,
  styles: [
    '#map { height: calc(100vh - 84px) }'
  ],
  providers: [
    CityItemService
  ]
})
export class CityMapComponent implements OnInit, OnDestroy {

  showForm: boolean = false;
  map: any; // google map
  geoCoder: GeoCoder;

  private editObservable: Observable<EntityCityItem>;
  private obs: any;

  @ViewChild('cityItemForm') cityItemForm: any;
  @ViewChild(InfoWindowComponent) infoWindow: InfoWindowComponent;

  private selectedItemIdSub: any;
  private selectedItemId: number;

  constructor(private _cityItemService: CityItemService,
              private _zone: NgZone,
              private _itemIconService: ItemIconService,
              private route: ActivatedRoute
              ) {
  }

  edit(item: EntityCityItem) {
    this.showForm = true;
    this.cityItemForm.render(item);
  }

  callback(item: EntityCityItem) {
    this.showForm = false;
    this.infoWindow.render();
  }

  ngOnInit() {
    this.subscribeOnSelectedItemParams();
    this.editObservable = new Observable<EntityCityItem>((obs: any) => {
      this.obs = obs;
    });
    this.editObservable.subscribe((item: EntityCityItem) => {
      this.edit(item);
    });
    this._itemIconService.init().then(() => {
      let that = this;
      let lviv = {
        lat: 49.848,
        lng: 24.0005
      };
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: lviv,
        zoom: 15,
        disableDoubleClickZoom: true
      });
      this.geoCoder = new GeoCoder();

      google.maps.event.addListener(this.map, 'click', function (event: any) {
        that.infoWindow.hide();
      });
      google.maps.event.addListener(this.map, 'dblclick', function (event: any) {
        that.infoWindow.hide();
        let cityItem: any = {
          name: '',
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng()
        };
        let marker = that.placeMarker(cityItem);
        that._zone.run(() => {

        });
      });
      this._cityItemService.findAll()
        .then(data => {
          for (let cityItem of data) {
            that.placeMarker(cityItem);
          }
        });
    });
  }

  placeMarker(cityItem: EntityCityItem) {
    let that = this;
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        cityItem.latitude,
        cityItem.longitude
      ),
      draggable: true,
      map: that.map,
      timeout: 100,
      icon: this._itemIconService._getIconUrl(cityItem.kind)
    });
    marker.cityItem = cityItem;
    cityItem['marker'] = marker;

    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.show(marker);
    });
    google.maps.event.addListener(marker, 'dragstart', () => {
      that.infoWindow.hide();
      marker.animation = google.maps.Animation.BOUNCE;
    });
    google.maps.event.addListener(marker, 'dragend', () => {
      marker.setAnimation(null);
      marker.cityItem.latitude = marker.position.lat();
      marker.cityItem.longitude = marker.position.lng();

      that.geoCoder.geocode(marker)
        .then((r) => {
          console.log(r);
        });
      that.infoWindow.show(marker);
    });
    if (cityItem.id === this.selectedItemId){
      this.map.setZoom(17);
      this.map.panTo(marker.position);
      google.maps.event.addListenerOnce(this.map, 'idle', function(){
        that.infoWindow.show(marker);
      });
    }
    return marker;
  }

  private subscribeOnSelectedItemParams() {
    this.selectedItemIdSub = this.route
      .queryParams
      .subscribe(params => {
        this.selectedItemId = +params['i'] || undefined;
      });
  }

  ngOnDestroy() {
    this.selectedItemIdSub.unsubscribe();
  }

}
