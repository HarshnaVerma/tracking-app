import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersInfoComponent} from './orders-info/orders-info.component';
import {OrderCreationComponent} from './order-creation/order-creation.component';
import {ViewOrderComponent} from './view-order/view-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';
import {DeleteOrderComponent} from './delete-order/delete-order.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import {SharedModule} from '../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ComponentsMatTableModule} from '../components-mat-table/components-mat-table.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [OrdersInfoComponent,
    OrderCreationComponent,
    ViewOrderComponent,
    EditOrderComponent,
    DeleteOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxSpinnerModule,
    GalleryModule.forRoot(),
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ComponentsMatTableModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    OrderCreationComponent,
    EditOrderComponent
  ]
})
export class OrdersModule {
}
