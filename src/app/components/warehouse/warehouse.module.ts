import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarehouseRoutingModule} from './warehouse-routing.module';
import {WarehouseRegistrationComponent} from './warehouse-registration/warehouse-registration.component';
import {WarehouseInfoComponent} from './warehouse-info/warehouse-info.component';
import {EditWarehouseComponent} from './edit-warehouse/edit-warehouse.component';
import {ViewWarehouseComponent} from './view-warehouse/view-warehouse.component';
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
import { DeleteWarehouseComponent } from './delete-warehouse/delete-warehouse.component';


@NgModule({
  declarations: [
    WarehouseRegistrationComponent,
    WarehouseInfoComponent,
    EditWarehouseComponent,
    ViewWarehouseComponent,
    DeleteWarehouseComponent
  ],
    imports: [
        CommonModule,
        WarehouseRoutingModule,
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
    WarehouseRegistrationComponent
  ]
})
export class WarehouseModule {
}
