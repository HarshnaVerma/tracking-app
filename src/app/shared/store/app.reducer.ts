import * as fromDriver from './driver/driver.reducer';
import * as fromUpload from './upload/upload.reducer';
import * as fromWarehouse from './warehouse/warehouse.reducer';
import * as fromVehicle from './vehicle/vehicle.reducer';
import * as fromTransporter from './transporter/transporter.reducer';
import * as fromOrder from './order/order.reducer';
import * as fromTask from './task/task.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface AppState {
  driver: fromDriver.DriverState;
  upload: fromUpload.UploadState;
  warehouse: fromWarehouse.WarehouseState;
  vehicle: fromVehicle.VehicleState;
  transporter: fromTransporter.TransporterState;
  order: fromOrder.OrderState;
  task: fromTask.TaskState;
}


export const appReducer: ActionReducerMap<AppState> = {
  driver: fromDriver.driverReducer,
  upload: fromUpload.uploadReducer,
  warehouse: fromWarehouse.warehouseReducer,
  vehicle: fromVehicle.vehicleReducer,
  transporter: fromTransporter.transporterReducer,
  order: fromOrder.orderReducer,
  task: fromTask.taskReducer
};
