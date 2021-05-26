import {AfterContentChecked, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import * as DriverActions from '../../../store/driver/driver.actions';
import {DriverInfo} from '../../../models/driver/driver-info';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {DialogService} from '../../../services/dialog.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BackendApiService} from '../../../services/backendapi.service';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-driver-assignment-list',
  templateUrl: './driver-assignment-list.component.html',
  styleUrls: ['./driver-assignment-list.component.scss']
})
export class DriverAssignmentListComponent implements OnInit, OnDestroy {
  driverListArr: DriverInfo[];
  public notFound = false;
  public searchText: string;
  public users: any[] = [];
  loadPage: boolean;
  storeSubscription: Subscription;
  selectedDriverList = [];

  constructor(public customizerService: CustomizerService, public store: Store<fromApp.AppState>,
              private dialogService: DialogService,
              private dialogRef: MatDialogRef<DriverAssignmentListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private backEndApiService: BackendApiService,
              private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.getDriverList();
  }

  getDriverList() {
    const request = {
      vehicleType: this.data.vehicleType,
      wareHouseLatitude: this.data.depotLatitude,
      wareHouseLongitude: this.data.depotLongitude
    };
    this.backEndApiService.postMapping(this.configService.get(this.configService.apiBaseUrlForDriverService,
      'GET_DRIVER_SORTED_LIST'), request).then(response => {
      this.driverListArr = response;
      if (this.data.selectedDriver.length !== 0) {
        this.selectedDriverList = this.data.selectedDriver;
      }
      this.loadPage = true;

    });
  }

  searchTerm(term: any) {
    if (!term) {
      return this.driverListArr = this.users;
    }
    term = term.toLowerCase();
    const user = [];
    this.users.filter(users => {
      if (users.name.toLowerCase().includes(term)) {
        user.push(users);
      }
    });
    this.checkSearchResultEmpty(user);
    this.driverListArr = user;
  }

  checkSearchResultEmpty(user) {
    this.notFound = !user.length;
  }

  // ngAfterContentChecked(): void {
  //
  // }

  selectedDrivers(driverId: any, event: any) {
    if (event.target.checked) {
      this.selectedDriverList.push(driverId);
    } else {
      const index = this.selectedDriverList.findIndex(x => x === driverId);
      if (index > -1) {
        this.selectedDriverList.splice(index, 1);
      }
    }
  }

  closeDialog() {
    if (this.selectedDriverList.length > 1) {
      this.dialogService.openErrorDialog('Please select only one driver');
      return;
    } else {
      this.dialogRef.close(this.selectedDriverList);
    }
  }

  isAddedToList(driverId) {
    return this.selectedDriverList.findIndex(x => x === driverId) !== -1;
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
