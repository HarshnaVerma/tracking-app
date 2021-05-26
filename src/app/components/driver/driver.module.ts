import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriverRoutingModule} from './driver-routing.module';
import {DriverRegistrationComponent} from './driver-registration/driver-registration.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import {SharedModule} from '../../shared/shared.module';
import {DriversInfoComponent} from './drivers-info/drivers-info.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ComponentsMatTableModule} from '../components-mat-table/components-mat-table.module';
import {ViewDriverComponent} from './view-driver/view-driver.component';
import {EditDriverComponent} from './edit-driver/edit-driver.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DriverApprovalComponent } from './driver-approval/driver-approval.component';
import {ErrorDialogComponent} from '../../shared/dialog/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from '../../shared/dialog/success-dialog/success-dialog.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [
    DriverRegistrationComponent,
    DriversInfoComponent,
    ViewDriverComponent,
    EditDriverComponent,
    DriverApprovalComponent,
    DeleteDriverComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
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
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  entryComponents: [
    DriverRegistrationComponent,
    ErrorDialogComponent,
    SuccessDialogComponent

  ]
})
export class DriverModule {
}
