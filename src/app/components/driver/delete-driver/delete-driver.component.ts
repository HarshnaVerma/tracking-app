import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as fromApp from '../../../shared/store/app.reducer';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {Store} from '@ngrx/store';
import {AfterDeleteDriverSuccess, StartDeleteDriver} from '../../../shared/store/driver/driver.actions';
import {Subscription} from 'rxjs';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import {DialogService} from '../../../shared/services/dialog.service';
import {DataSharingService} from "../../../shared/services/data-sharing.service";

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.scss']
})
export class DeleteDriverComponent implements OnInit {

  storeSubscription: Subscription;
  driverData: DriverInfo[];
  constructor(public dialogRef: MatDialogRef<DeleteDriverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private customizerService: CustomizerService,
              public store: Store<fromApp.AppState>, private dataSharingService: DataSharingService) {
  }

  ngOnInit(): void {
  }


  deleteDriver() {
    this.store.dispatch(new StartDeleteDriver(this.data.rowData.driverId));
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      console.log('val: ' + JSON.stringify(value));
      if (value.save_driver_success !== null) {
        this.dialogRef.close();
        this.driverData = value.DRIVER_DATA.slice();
        this.customizerService.deleteDriver(this.driverData , this.data.rowData.driverId);
        this.store.dispatch(new AfterDeleteDriverSuccess(this.driverData));
        this.dataSharingService.getDriverStatusInfoData();
      }
    });
  }
}
