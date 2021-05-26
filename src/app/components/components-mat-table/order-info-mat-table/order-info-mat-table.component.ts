import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {OrdersInfo} from '../../../shared/models/order/orders-info';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {ViewOrderComponent} from '../../orders/view-order/view-order.component';
import {EditOrderComponent} from '../../orders/edit-order/edit-order.component';
import {DeleteOrderComponent} from '../../orders/delete-order/delete-order.component';
import {StartGetListOrder} from '../../../shared/store/order/order.actions';

@Component({
  selector: 'app-order-info-mat-table',
  templateUrl: './order-info-mat-table.component.html',
  styleUrls: ['./order-info-mat-table.component.scss']
})
export class OrderInfoMatTableComponent implements OnInit {

  displayedColumns: string[] = [
    'orderId',
    'orderDescription',
    'orderStatus',
    'orderLength',
    'orderWeight',
    'actions'
  ];
  dataSource: MatTableDataSource<OrdersInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  storeSubscription: Subscription;

  constructor(private dialog: MatDialog, public store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.store.dispatch(new StartGetListOrder());
    this.storeSubscription = this.store.select('order').subscribe(value => {
      this.dataSource =
        new MatTableDataSource<OrdersInfo>(value.ORDER_DATA);
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
    this.dialog.open(ViewOrderComponent, {
      width: '1000px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  editDetails(row: any) {
    this.dialog.open(EditOrderComponent, {
      width: '1000px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }

  onDelete(row) {
    this.dialog.open(DeleteOrderComponent, {
      width: '350px',
      data: {rowData: row},
      backdropClass: 'backdropBackground'
    });
  }
}
