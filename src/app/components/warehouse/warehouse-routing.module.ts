import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WarehouseInfoComponent} from './warehouse-info/warehouse-info.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'warehouse-info',
        component: WarehouseInfoComponent,
        data: {
          // title: 'Drivers Info',
          breadcrumb: 'Warehouse Info'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
