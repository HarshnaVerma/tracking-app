import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsMatTableRoutingModule} from './components-mat-table-routing.module';
import {DriverInfoMatTableComponent} from './driver-info-mat-table/driver-info-mat-table.component';
import {SharedModule} from '../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {ViewDriverComponent} from '../driver/view-driver/view-driver.component';
import {EditDriverComponent} from '../driver/edit-driver/edit-driver.component';
import {VehicleInfoMatTableComponent} from './vehicle-info-mat-table/vehicle-info-mat-table.component';
import {ViewVehicleComponent} from '../vehicle/view-vehicle/view-vehicle.component';
import {EditVehicleComponent} from '../vehicle/edit-vehicle/edit-vehicle.component';
import {WarehouseInfoMatTableComponent} from './warehouse-info-mat-table/warehouse-info-mat-table.component';
import {EditWarehouseComponent} from '../warehouse/edit-warehouse/edit-warehouse.component';
import {ViewWarehouseComponent} from '../warehouse/view-warehouse/view-warehouse.component';
import {DriverApprovalComponent} from '../driver/driver-approval/driver-approval.component';
import {DeleteDriverComponent} from '../driver/delete-driver/delete-driver.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DeleteWarehouseComponent} from '../warehouse/delete-warehouse/delete-warehouse.component';
import {DeleteVehicleComponent} from '../vehicle/delete-vehicle/delete-vehicle.component';
import { OrderInfoMatTableComponent } from './order-info-mat-table/order-info-mat-table.component';


@NgModule({
  declarations: [
    DriverInfoMatTableComponent,
    VehicleInfoMatTableComponent,
    WarehouseInfoMatTableComponent,
    OrderInfoMatTableComponent
  ],
    exports: [
        DriverInfoMatTableComponent,
        VehicleInfoMatTableComponent,
        WarehouseInfoMatTableComponent,
        OrderInfoMatTableComponent
    ],
  imports: [
    CommonModule,
    ComponentsMatTableRoutingModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NgxSpinnerModule,
  ],
  entryComponents: [
    ViewDriverComponent,
    EditDriverComponent,
    ViewVehicleComponent,
    EditVehicleComponent,
    EditWarehouseComponent,
    ViewWarehouseComponent,
    DriverApprovalComponent,
    DeleteDriverComponent,
    DeleteWarehouseComponent,
    DeleteVehicleComponent
  ]
})
export class ComponentsMatTableModule {
}
