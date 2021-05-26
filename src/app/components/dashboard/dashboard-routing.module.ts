import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'app-dashboard',
        component: AppDashboardComponent,
        data: {
         // title: 'App Dashboard',
          breadcrumb: 'Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
