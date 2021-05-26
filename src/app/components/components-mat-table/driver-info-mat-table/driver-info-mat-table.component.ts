import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ViewDriverComponent} from '../../driver/view-driver/view-driver.component';
import {EditDriverComponent} from '../../driver/edit-driver/edit-driver.component';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import {DriverApprovalComponent} from '../../driver/driver-approval/driver-approval.component';
import * as fromApp from '../../../shared/store/app.reducer';
import {Store} from '@ngrx/store';
import * as DriverActions from '../../../shared/store/driver/driver.actions';
import {Subscription} from 'rxjs';
import {DeleteDriverComponent} from '../../driver/delete-driver/delete-driver.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-driver-info-mat-table',
  templateUrl: './driver-info-mat-table.component.html',
  styleUrls: ['./driver-info-mat-table.component.scss']
})
export class DriverInfoMatTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'name',
    'contact',
    'email',
    'driverStatus',
    'actions'];
  dataSource: MatTableDataSource<DriverInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  storeSubscription: Subscription;

  constructor(private dialog: MatDialog, public store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.store.dispatch(new DriverActions.StartGetListDriver());
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      this.dataSource =
        new MatTableDataSource<DriverInfo>(value.DRIVER_DATA);
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
   this.dialog.open(ViewDriverComponent, {
      width: '1100px',
      data: {rowData: row},
      backdropClass: 'backdropBackground',
    });
  }

  onApprove(row) {
    this.dialog.open(DriverApprovalComponent, {
      width: '1100px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  editDetails(row) {
    this.dialog.open(EditDriverComponent, {
      width: '1100px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  onDelete(row) {
    this.dialog.open(DeleteDriverComponent, {
      width: '350px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
