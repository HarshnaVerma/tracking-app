import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
// services
import { NavService } from './services/nav.service';
// Directives
import { ToggleFullscreenDirective } from './directives/fullscreen.directive';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {LoaderComponent} from './components/loader/loader.component';
import { RightInfoComponent } from './components/right-info/right-info.component';
import {RightSidebarComponent} from './components/right-sidebar/right-sidebar.component';
import {CustomizerComponent} from './components/customizer/customizer.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {MapService} from './services/map.service';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import {NumberDirective} from './directives/numbers-only.directive';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {IgxTabsModule} from 'igniteui-angular';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TaskDriverInfoComponent} from './task-management/task-driver-info/task-driver-info.component';
import {UnassignedTaskComponent} from './task-management/task/unassigned-task/unassigned-task.component';
import {AssignedTaskComponent} from './task-management/task/assigned-task/assigned-task.component';
import {CompletedTaskComponent} from './task-management/task/completed-task/completed-task.component';
import {FreeDriverComponent} from './task-management/driver/free-driver/free-driver.component';
import {BusyDriverComponent} from './task-management/driver/busy-driver/busy-driver.component';
import {InactiveDriverComponent} from './task-management/driver/inactive-driver/inactive-driver.component';
import {TaskInfoComponent} from './task-management/task/task-info/task-info.component';
import {DriverInfoComponent} from './task-management/driver/driver-info/driver-info.component';
import {DriverAssignmentListComponent} from './task-management/driver/driver-assignment-list/driver-assignment-list.component';
import {CreateTaskComponent} from './task-management/task/create-task/create-task.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatIconModule} from '@angular/material/icon';
import { AssignDriverToTaskComponent } from './task-management/task/assign-driver-to-task/assign-driver-to-task.component';
import { TaskDetailedInfoComponent } from './task-management/task/task-detailed-info/task-detailed-info.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { TaskDetailsComponent } from './task-management/task/task-details/task-details.component';
import { TaskCustomerComponent } from './task-management/task/task-customer/task-customer.component';
import { TaskHistoryComponent } from './task-management/task/task-history/task-history.component';
import {VerticalTimelineModule} from 'angular-vertical-timeline';
import { DriverDetailedInfoComponent } from './task-management/driver/driver-detailed-info/driver-detailed-info.component';
import { DriverDetailsComponent } from './task-management/driver/driver-details/driver-details.component';
import { DriverTimelineComponent } from './task-management/driver/driver-timeline/driver-timeline.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    ToggleFullscreenDirective,
    DeleteDialogComponent,
    LoaderComponent,
    RightInfoComponent,
    RightSidebarComponent,
    CustomizerComponent,
    GoogleMapComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    NumberDirective,
    TaskDriverInfoComponent,
    UnassignedTaskComponent,
    AssignedTaskComponent,
    CompletedTaskComponent,
    FreeDriverComponent,
    BusyDriverComponent,
    InactiveDriverComponent,
    TaskInfoComponent,
    DriverInfoComponent,
    CreateTaskComponent,
    DriverAssignmentListComponent,
    AssignDriverToTaskComponent,
    TaskDetailedInfoComponent,
    TaskDetailsComponent,
    TaskCustomerComponent,
    TaskHistoryComponent,
    DriverDetailedInfoComponent,
    DriverDetailsComponent,
    DriverTimelineComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwmyhNz47xqqIl-FD8GSaw30dwTae0nOQ'
    }),
    HttpClientModule,
    TooltipModule,
    NgbTabsetModule,
    MatTabsModule,
    IgxTabsModule,
    NgbTooltipModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    NgxSpinnerModule,
    NgbTimepickerModule,
    MatIconModule,
    MatStepperModule,
    MatListModule,
    VerticalTimelineModule,
    ReactiveFormsModule
  ],
  exports: [
    FeatherIconsComponent,
    LoaderComponent,
    RightInfoComponent,
    GoogleMapComponent,
    NumberDirective
  ],
  providers: [
    NavService,
    MapService
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    CreateTaskComponent,
    DriverAssignmentListComponent,
    AssignDriverToTaskComponent,
    TaskDetailedInfoComponent,
    DriverDetailedInfoComponent
  ]
})
export class SharedModule { }

