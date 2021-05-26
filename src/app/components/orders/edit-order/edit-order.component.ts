import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  editOrderFormGroup: FormGroup;
 // statusData = ['CREATED' , 'ASSIGNED' , 'UNASSIGNED' , 'DELIVERED'];
  constructor(private formBuilder: FormBuilder ,  private dialogRef: MatDialogRef<EditOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createdOrderForm();
  }

  createdOrderForm() {
    this.editOrderFormGroup = this.formBuilder.group({
      orderId: [this.data.rowData.orderId],
      orderDescription: [this.data.rowData.orderDescription , Validators.required],
      length: [this.data.rowData.length, Validators.required],
      weight: [this.data.rowData.weight , Validators.required]
     // orderStatus: ['' , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editOrderFormGroup.controls[controlName].hasError(errorName);
  }

  updateOrder() {

  }
}
