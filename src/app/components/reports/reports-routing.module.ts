import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverReportComponent} from './driver-report/driver-report.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'driver-report',
        component: DriverReportComponent,
        data: {
          // title: 'Drivers Info',
          breadcrumb: 'Driver Report'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
