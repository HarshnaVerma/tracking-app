import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MapData, MapService} from '../../../shared/services/map.service';
import {MapsAPILoader} from '@agm/core';
// @ts-ignore
import {} from 'googlemaps';
import {DataSharingService} from "../../../shared/services/data-sharing.service";

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppDashboardComponent implements OnInit {

  @ViewChild('searchLocation', {static: false})
  public searchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  currentAddress: any;
  getAddress: any;

  constructor(private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private dataSharingService: DataSharingService) {
  }

  ngOnInit() {
    sessionStorage.setItem('userId', 'Admin');
  //  this.getCurrentLocation();
    this.loadCurrentLocation().then();
    this.loadGoogleMap();
  }


  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            // reject();
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        //  this.zoom = 12;
        });
      });
    });
  }

  async loadCurrentLocation() {
    const currentLocationCoordinates = await this.mapService.getCurrentLocation();

    // @ts-ignore
    this.latitude = currentLocationCoordinates.latitude;
    // @ts-ignore
    this.longitude = currentLocationCoordinates.longitude;
    // @ts-ignore
  //  this.zoom = currentLocationCoordinates.zoom;

    console.log(this.dataSharingService.userGeoLocationData);
    // this.dataSharingService.userGeoLocationData.subscribe(response => {
    //   const googleMapReturnCurrentAddress = this.
    //   mapService.getAddress(response.latitude,
    //     response.longitude).then(addressRes => {
    //     this.currentAddress = addressRes.address;
    //   });
    // });
    const googleMapReturnCurrentAddress = await this.
    mapService.getAddress(this.latitude,
      this.longitude);
    // @ts-ignore
    this.currentAddress = googleMapReturnCurrentAddress.address;
  }


  clearValues() {
    this.currentAddress = '';
  }
}
