import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverRegistrationComponent} from './driver-registration/driver-registration.component';
import {DriversInfoComponent} from './drivers-info/drivers-info.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'drivers-info',
        component: DriversInfoComponent,
        data: {
         // title: 'Drivers Info',
          breadcrumb: 'Drivers Info'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
