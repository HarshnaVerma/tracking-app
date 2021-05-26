import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @Input()public latitude = 52.5159;
  @Input()public longitude = 13.3777;
  public zoom = 15;
  // public lat_m2: number = 52.5159;
  // public lng_m2: number = 13.3777;
  // public zoom_m2: number = 14;

  public markers: Marker[] = [
    {
      lat: 52.5159,
      lng: 13.3777,
      label: 'A',
      draggable: true
    },
    {
      lat: 52.5159,
      lng: 13.3730,
      label: 'B',
      draggable: true
    },
    {
      lat: 52.5059,
      lng: 13.3771,
      label: 'C',
      draggable: true
    }
  ];

  constructor() { }

  public mapClicked(e) { }

  ngOnInit() {  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}
