declare var google: any;

export class InfoWindow {

  map: any;
  infoWindow: any;

  constructor(o: any) {
    this.infoWindow = new google.maps.InfoWindow({
      content : '',
      maxWidth: 150
    });
    this.map = o.map;
  }

  show(marker: any) {
    this.infoWindow.setContent(
      "<b>" + marker.cityItem.name + "</b><br>" +
      // marker.formatted_address + "<br>" +
      "<i>coordinates:</i> " + marker.getPosition().toUrlValue(6) + ".");
    this.infoWindow.open(this.map, marker);
  }

  hide() {
    this.infoWindow.close();
  }


}
