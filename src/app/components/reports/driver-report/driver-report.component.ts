import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as DriverActions from '../../../shared/store/driver/driver.actions';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {DialogService} from '../../../shared/services/dialog.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {formatDate} from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-driver-report',
  templateUrl: './driver-report.component.html',
  styleUrls: ['./driver-report.component.scss']
})
export class DriverReportComponent implements OnInit, OnDestroy {

  driverReportFormGroup: FormGroup;
  driverInfo: DriverInfo[];
  storeSubscription: Subscription;
  searchResponseData = [];
  totalTrips = 0;
  totalEarning;
  showTable = true;
  constructor(private configService: ConfigService , private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder, private dialogService: DialogService,
              private router: Router,
               ) {

              }
  

  ngOnInit(): void {
    this.driverReportForm();
    this.getDriverInfo();
    
  }

  driverReportForm() {
    this.driverReportFormGroup = this.formBuilder.group({
      driver: ['' , Validators.required],
      date: ['', Validators.required]
    });
  }

  getDriverInfo() {
    this.store.dispatch(new DriverActions.StartGetListDriver());
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      this.driverInfo = value.DRIVER_DATA;
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.driverReportFormGroup.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  searchData() {
    this.showTable = false;
    const apiUrl = this.configService.get(this.configService.apiBaseUrlForDriverService,
      'URL_GET_COMPLETED_JOB') + '?driverId=' + this.driverReportFormGroup.get('driver').value +
    '&filterDate=' + formatDate(this.driverReportFormGroup.get('date').value, 'dd-MM-yyyy' , 'en');

    this.backendApiService.callGetApi(apiUrl).subscribe(response => {
      if (response === null) {
        return;
      }
      this.searchResponseData = response;
      this.totalTrips = this.searchResponseData.length;
      this.totalEarning = 0;
      for (const entry of this.searchResponseData) {
       this.totalEarning += Number(entry.taskDetail.totalFare);
      }
      this.totalEarning = '' + this.totalEarning;
      this.showTable = true;
    });
  }

  
  
}
