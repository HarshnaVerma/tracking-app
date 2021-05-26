import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {VehicleRegistrationComponent} from '../vehicle-registration/vehicle-registration.component';
import {VehicleInfoMatTableComponent} from '../../components-mat-table/vehicle-info-mat-table/vehicle-info-mat-table.component';

@Component({
  selector: 'app-vehicles-info',
  templateUrl: './vehicles-info.component.html',
  styleUrls: ['./vehicles-info.component.scss']
})
export class VehiclesInfoComponent implements OnInit {

  @ViewChild('vehicleInfoTable') vehicleInfoTable: VehicleInfoMatTableComponent;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  addVehicle() {
    this.dialog.open(VehicleRegistrationComponent, {
      width: '800px',
      // height: '600px',
      //    panelClass: 'custom-modalbox',
      backdropClass: 'backdropBackground',
      //  disableClose: true
    }).afterClosed().subscribe(response => {
      if (response !== false) {
        this.vehicleInfoTable.getInitialData();
      }
    });
  }
}
