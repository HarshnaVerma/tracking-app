import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {DialogService} from '../../../shared/services/dialog.service';
import {AfterDeleteWarehouseSuccess, StartDeleteWarehouse} from '../../../shared/store/warehouse/warehouse.actions';
import {WarehouseInfo} from '../../../shared/models/warehouse/warehouse-info';

@Component({
  selector: 'app-delete-warehouse',
  templateUrl: './delete-warehouse.component.html',
  styleUrls: ['./delete-warehouse.component.scss']
})
export class DeleteWarehouseComponent implements OnInit {

  storeSubscription: Subscription;
  warehouseData: WarehouseInfo[];
  constructor(public dialogRef: MatDialogRef<DeleteWarehouseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private customizerService: CustomizerService,
              public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }


  deleteWarehouse() {
    this.store.dispatch(new StartDeleteWarehouse(this.data.rowData.depotId));
    this.storeSubscription = this.store.select('warehouse').subscribe(value => {
      console.log('val: ' + JSON.stringify(value));
      if (value.save_warehouse_success !== null) {
        this.dialogRef.close();
        this.warehouseData = value.WAREHOUSE_DATA.slice();
        this.customizerService.deleteWarehouse(this.warehouseData , this.data.rowData.depotId);
        this.store.dispatch(new AfterDeleteWarehouseSuccess(this.warehouseData));
      }
    });
  }
}
