import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ViewVehicleComponent} from '../../vehicle/view-vehicle/view-vehicle.component';
import {EditVehicleComponent} from '../../vehicle/edit-vehicle/edit-vehicle.component';
import {VehicleInfo} from '../../../shared/models/vehicle/vehicle-info';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import * as VehicleActions from '../../../shared/store/vehicle/vehicle.actions';
import {DeleteVehicleComponent} from '../../vehicle/delete-vehicle/delete-vehicle.component';

@Component({
  selector: 'app-vehicle-info-mat-table',
  templateUrl: './vehicle-info-mat-table.component.html',
  styleUrls: ['./vehicle-info-mat-table.component.scss']
})
export class VehicleInfoMatTableComponent implements OnInit {

  displayedColumns: string[] = [
    'transporterName',
    'vehicleType',
    'vehicleNumber',
    'driverName',
    'Status',
    'actions'];
  dataSource: MatTableDataSource<VehicleInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  storeSubscription: Subscription;

  constructor(private dialog: MatDialog, public store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.store.dispatch(new VehicleActions.StartGetListVehicle());
    this.storeSubscription = this.store.select('vehicle').subscribe(value => {
      this.dataSource =
        new MatTableDataSource<VehicleInfo>(value.VEHICLE_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(row) {
    this.dialog.open(ViewVehicleComponent, {
      width: '800px',
      data: {rowData: row},
      backdropClass: 'backdropBackground',
    });
  }

  editDetails(row: any) {
    this.dialog.open(EditVehicleComponent, {
      width: '800px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    }).afterClosed().subscribe(response => {
      if (response !== false) {
        this.getInitialData();
      }
    });
  }

  onDelete(row) {
    this.dialog.open(DeleteVehicleComponent, {
      width: '350px',
      data: {rowData: row},
      backdropClass: 'backdropBackground',
    });
  }
}
