declare var google: any;

export class GeoCoder {

  geocoder: any;

  constructor() {
    this.geocoder = new google.maps.Geocoder();
  }

  geocode(marker: any): Promise<any[]> {
    let that = this;
    return new Promise<any[]>((resolve, reject) => {
      that.geocoder.geocode({
        latLng: marker.getPosition()
      }, function (responses: any) {
        if (responses && responses.length > 0) {
          resolve(<any[]>responses);
        }
        else {
          reject(<any[]>['Can\'t geocode position']);
        }
      });
    });
  }

}
