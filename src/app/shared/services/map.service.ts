import {Injectable, Input, NgZone} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

export class MapData {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  nearestLatitude: number;
  nearestLongitude: number;
}
@Injectable({
  providedIn: 'root'
})
export class MapService {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  googleMapData: MapData = new MapData();
  private geoCoder = new google.maps.Geocoder();

  constructor( private mapsAPILoader: MapsAPILoader,
               private ngZone: NgZone) { }


  setGoogleMapData(googleMapData: MapData) {
    this.googleMapData = googleMapData;
  }

  getGoogleMApData() {
    return this.googleMapData;
  }

  // Get Current Location Coordinates
  getCurrentLocation() {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const mapData = new MapData();
          mapData.latitude = position.coords.latitude;
          mapData.longitude = position.coords.longitude;
        //  mapData.zoom = 8;
          resolve(mapData);
        }, () => {}
         , {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true});
      }
    });
  }


  getAddress(latitude, longitude) {
    return new Promise<any>((resolve) => {
      this.geoCoder.geocode({location: {lat: latitude, lng: longitude}},
        (results, status) => {
        console.log(results);
        console.log(status);
        const mapData = new MapData();
        if (status === 'OK') {
          if (results[0]) {
            mapData.zoom = 12;
            mapData.address = results[0].formatted_address;
            mapData.nearestLatitude = results[1].geometry.location.lat();
            mapData.nearestLongitude = results[1].geometry.location.lng();
            resolve(mapData);
          } else {
            // reject();
            mapData.address = '';
            resolve(mapData);
            console.log('No results found');
          }
        } else {
          mapData.address = '';
          resolve(mapData);
          console.log('Geocoder failed due to: ' + status);
        }

      });
    });
  }
}
