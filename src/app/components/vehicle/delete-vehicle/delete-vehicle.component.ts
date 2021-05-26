import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {VehicleInfo} from '../../../shared/models/vehicle/vehicle-info';
import {AfterDeleteVehicleSuccess, StartDeleteVehicle} from '../../../shared/store/vehicle/vehicle.actions';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.scss']
})
export class DeleteVehicleComponent implements OnInit {

  storeSubscription: Subscription;
  vehicleData: VehicleInfo[];
  constructor(public dialogRef: MatDialogRef<DeleteVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private customizerService: CustomizerService,
              public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }


  deleteVehicle() {
    this.store.dispatch(new StartDeleteVehicle(this.data.rowData.vehicleId + '/' + sessionStorage.getItem('userId')));
    this.storeSubscription = this.store.select('vehicle').subscribe(value => {
      if (value.save_vehicle_success !== null) {
        this.dialogRef.close();
        this.vehicleData = value.VEHICLE_DATA.slice();
        this.customizerService.deleteVehicle(this.vehicleData , this.data.rowData.vehicleId);
        this.store.dispatch(new AfterDeleteVehicleSuccess(this.vehicleData));
      }
    });
  }
}
