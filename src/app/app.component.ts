import {Component, OnInit} from '@angular/core';
import {VisitorsService} from './shared/services/visitors.service';
import {DataSharingService} from './shared/services/data-sharing.service';
import {UserGeoLocation} from './shared/models/user-geo-location/user-geo-location';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tracking-system-admin';
  userGeoLocation: UserGeoLocation = new UserGeoLocation();

  constructor(
    private visitorsService: VisitorsService,
    private dataSharingService: DataSharingService
   // private db:AngularFireDatabase
    )
   {

  }

  ngOnInit() {

    this.visitorsService.getIpAddress().subscribe(res => {
      this.userGeoLocation.ipaddress = res.ip;
      this.visitorsService.getGEOLocation(res.ip).subscribe(geoResponse => {
        this.userGeoLocation.latitude = Number(geoResponse.latitude);
        this.userGeoLocation.longitude = Number(geoResponse.longitude);
        this.userGeoLocation.currency = geoResponse.currency.code;
        this.userGeoLocation.currencySymbol = geoResponse.currency.symbol;
        this.userGeoLocation.city = geoResponse.city;
        this.userGeoLocation.country = geoResponse.country_code3;
        this.userGeoLocation.isp = geoResponse.isp;
        this.userGeoLocation.countryCode = geoResponse.country_code2;
        console.log(geoResponse);
        console.log(this.userGeoLocation);
        this.dataSharingService.userGeoLocationData.next(this.userGeoLocation);
        //this.db.drivers = db.list('/Drivers');
      });
      // console.log(res);

    });
  }
}
