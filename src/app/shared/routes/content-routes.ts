import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'driver',
    loadChildren: () => import('../../components/driver/driver.module').then(m => m.DriverModule),
    data: {
      breadcrumb: 'DriverParamModel'
    }
  },
  {
    path: 'vehicle',
    loadChildren: () => import('../../components/vehicle/vehicle.module').
    then(m => m.VehicleModule)
  },
  {
    path: 'warehouse',
    loadChildren: () => import('../../components/warehouse/warehouse.module').
    then(m => m.WarehouseModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('../../components/orders/orders.module').
    then(m => m.OrdersModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('../../components/reports/reports.module').
    then(m => m.ReportsModule)
  }
];
