import {Component, OnInit, Input, EventEmitter, Output, NgZone} from '@angular/core';
import {Router} from "@angular/router";

declare var google: any;

@Component({
  selector: 'info-window',
  template: ''
})
export class InfoWindowComponent implements OnInit {

  @Input() map: any;
  infoWindow: any;
  marker: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor(private _zone: NgZone,
              private router: Router) {
  }

  ngOnInit() {
    this.infoWindow = new google.maps.InfoWindow({
      content : '',
      maxWidth: 170
    });
    window['_thisInfoWindow'] = this;
  }

  show(marker: any) {
    this.marker = marker;
    this.render();
  }

  doEdit(e){
    e.preventDefault();
    let that = window['_thisInfoWindow'];
    that._zone.run(() => {
      that.edit.emit(that.marker.cityItem);
    });
  }

  goToMaps(e){
    e.preventDefault();
    this.router.navigate(['/cityItem/' + this.marker.cityItem.id + '/maps']);
  }

  render(){
    this.infoWindow.setContent(
      '<b>' + this.marker.cityItem.name + '</b><br>' +
      `<a href="#" onclick="window['_thisInfoWindow'].doEdit(event)">edit</a><br>
       <a href="#" onclick="window['_thisInfoWindow'].goToMaps(event)">go to maps</a>`);
     // '<i>coordinates:</i>' + this.marker.getPosition().toUrlValue(6) + '.');
    this.infoWindow.open(this.map, this.marker);
  }

  hide() {
    this.infoWindow.close();
  }

}
