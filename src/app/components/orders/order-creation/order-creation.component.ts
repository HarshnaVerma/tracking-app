import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {OrderParamModel} from '../../../shared/models/order/order-param.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {StartAddOrder} from '../../../shared/store/order/order.actions';
import {DialogService} from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.scss']
})
export class OrderCreationComponent implements OnInit, OnDestroy {

  addOrderFormGroup: FormGroup;
  storeSubscription: Subscription;
  constructor(private formBuilder: FormBuilder ,  private dialogRef: MatDialogRef<OrderCreationComponent>,
              public store: Store<fromApp.AppState>,  private dialogService: DialogService) { }

  ngOnInit(): void {
    this.createdOrderForm();
  }

  createdOrderForm() {
    this.addOrderFormGroup = this.formBuilder.group({
      orderDescription: ['' , Validators.required],
      length: ['', Validators.required],
      weight: ['' , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addOrderFormGroup.controls[controlName].hasError(errorName);
  }

  createOrder() {
    const orderParam: OrderParamModel = new OrderParamModel();
    orderParam.orderDescription = this.addOrderFormGroup.controls.orderDescription.value;
    orderParam.length = this.addOrderFormGroup.controls.length.value;
    orderParam.weight = this.addOrderFormGroup.controls.weight.value;
    orderParam.userId = '';
    orderParam.createdBy = sessionStorage.getItem('userId');

    this.store.dispatch(new StartAddOrder(orderParam));
    this.storeSubscription = this.store.select('order').subscribe(value => {
      if (value.save_order_success !== null) {
        this.dialogService.openSuccessDialog('Order Added Successfully');
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
