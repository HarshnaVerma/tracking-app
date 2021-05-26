import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesInfoComponent} from './vehicles-info/vehicles-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'vehicles-info',
        component: VehiclesInfoComponent,
        data: {
          // title: 'Drivers Info',
          breadcrumb: 'Vehicles Info'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
