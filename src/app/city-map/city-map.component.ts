import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {InfoWindow} from './info-window';
import {GeoCoder} from './geo-coder';
import {CityItem} from '../api/model/city-item';
import {CityItemService} from '../api/service/city-item.service';
import {Observable} from "rxjs";

declare var google: any;

@Component({
    selector: 'city-map',
    template: ` <div [hidden]="showForm" id="map"></div>
                <dynamic-form #cityItemForm
                   [hidden]="!showForm"
                   [service]="_cityItemService">
                </dynamic-form>
                
              `,
    styles: [
        '#map { height: calc(100vh - 84px) }'
    ],
    providers: [
        CityItemService
    ]
})
export class CityMapComponent implements OnInit {

    showForm: boolean = !true;
    map: any; // google map
    infoWindow: InfoWindow;
    geoCoder: GeoCoder;
    current: any = {
        model: new CityItem({})
    };
    private editObservable: Observable<CityItem>;
    private obs : any;

    @ViewChild('cityItemForm') cityItemForm : any;

    constructor(private _cityItemService: CityItemService,
                private _zone: NgZone) {
    }

    edit(item: CityItem){
        this.showForm = true;
        this.cityItemForm.render(item);
    }

    ngOnInit() {
        this.editObservable = new Observable<CityItem>((obs : any) => {
            this.obs = obs;
        });
        this.editObservable.subscribe((item : CityItem) => {
            this.edit(item);
        });

        Promise.resolve().then(() => {
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
            this.infoWindow = new InfoWindow({
                map: this.map
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
                    that.current.model = marker.cityItem;

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


    placeMarker(cityItem: CityItem) {
        let that = this;
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(
                cityItem.latitude,
                cityItem.longitude
            ),
            draggable: true,
            map: that.map,
            timeout: 100
        });
            // icon: config.endpoint + this.iconUrls[this.icons[cityItem.kind]].hdpi
        marker.cityItem = cityItem;
        cityItem['marker'] = marker;

        google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.show(marker);
            // });
            // google.maps.event.addListener(marker, 'dblclick', () => {
            that._zone.run(() => {
                that.obs.next(marker.cityItem);
            });
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
        return marker;
    }

}
