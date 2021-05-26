import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {OrdersInfo} from '../../../shared/models/order/orders-info';
import {AfterDeleteOrderSuccess, StartDeleteOrder} from '../../../shared/store/order/order.actions';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  storeSubscription: Subscription;
  orderData: OrdersInfo[];
  constructor(public dialogRef: MatDialogRef<DeleteOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private customizerService: CustomizerService,
              public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }


  deleteOrder() {
    this.store.dispatch(new StartDeleteOrder(this.data.rowData.orderId));
    this.storeSubscription = this.store.select('order').subscribe(value => {
      console.log('val: ' + JSON.stringify(value));
      if (value.save_order_success !== null) {
        this.dialogRef.close();
        this.orderData = value.ORDER_DATA.slice();
        this.customizerService.deleteOrder(this.orderData , this.data.rowData.orderId);
        this.store.dispatch(new AfterDeleteOrderSuccess(this.orderData));
      }
    });
  }
}
