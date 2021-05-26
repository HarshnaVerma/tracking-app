import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {VehicleRegistrationComponent} from './vehicle-registration/vehicle-registration.component';
import {EditVehicleComponent} from './edit-vehicle/edit-vehicle.component';
import {ViewVehicleComponent} from './view-vehicle/view-vehicle.component';
import {VehiclesInfoComponent} from './vehicles-info/vehicles-info.component';
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
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';


@NgModule({
  declarations: [
    VehicleRegistrationComponent,
    EditVehicleComponent,
    ViewVehicleComponent,
    VehiclesInfoComponent,
    DeleteVehicleComponent
  ],
    imports: [
        CommonModule,
        VehicleRoutingModule,
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
    VehicleRegistrationComponent
  ]
})
export class VehicleModule {
}
