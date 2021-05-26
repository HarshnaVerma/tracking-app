import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersInfoComponent} from './orders-info/orders-info.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'orders-info',
        component: OrdersInfoComponent,
        data: {
          // title: 'Drivers Info',
          breadcrumb: 'Orders Info'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
