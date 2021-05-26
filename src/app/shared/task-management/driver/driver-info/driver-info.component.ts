import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DriverInfo} from '../../../models/driver/driver-info';
import {DataSharingService} from '../../../services/data-sharing.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit, OnDestroy {

  @Input()searchValue: string;
  freeDrivers: DriverInfo[];
  busyDrivers: DriverInfo[];
  inactiveDrivers: DriverInfo[];
  storeSubscription: Subscription;
  intervalSubscription: Subscription;
  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.intervalSubscription = Observable.interval(5000)
      .subscribe(() => {
        this.dataSharingService.getDriverStatusInfoData();
      });
    this.getDriverInfoSubjectData();
  }

  getDriverInfoSubjectData() {
    this.storeSubscription = this.dataSharingService.driverStatusData.subscribe(value => {
        this.freeDrivers = value.freeDrivers;
        this.busyDrivers = value.busyDrivers;
        this.inactiveDrivers = value.inactiveDrivers;
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

}
