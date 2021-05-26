import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {WarehouseInfo} from '../../../shared/models/warehouse/warehouse-info';
import {ViewWarehouseComponent} from '../../warehouse/view-warehouse/view-warehouse.component';
import {EditWarehouseComponent} from '../../warehouse/edit-warehouse/edit-warehouse.component';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {Subscription} from 'rxjs';
import * as WarehouseActions from '../../../shared/store/warehouse/warehouse.actions';
import {DeleteWarehouseComponent} from '../../warehouse/delete-warehouse/delete-warehouse.component';

@Component({
  selector: 'app-warehouse-info-mat-table',
  templateUrl: './warehouse-info-mat-table.component.html',
  styleUrls: ['./warehouse-info-mat-table.component.scss']
})
export class WarehouseInfoMatTableComponent implements OnInit {

  displayedColumns: string[] = [
    'warehouseName',
    'warehouseStatus',
    'createdBy',
    'createdOn',
    'actions'
  ];
  dataSource: MatTableDataSource<WarehouseInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  storeSubscription: Subscription;

  constructor(private dialog: MatDialog, public store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.store.dispatch(new WarehouseActions.StartGetListWarehouse());
    this.storeSubscription = this.store.select('warehouse').subscribe(value => {
      this.dataSource =
        new MatTableDataSource<WarehouseInfo>(value.WAREHOUSE_DATA);
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
    this.dialog.open(ViewWarehouseComponent, {
      width: '1000px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  editDetails(row: any) {
    this.dialog.open(EditWarehouseComponent, {
      width: '1000px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  onDelete(row) {
    this.dialog.open(DeleteWarehouseComponent, {
      width: '350px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }
}
