import {DriverInfo} from '../driver/driver-info';
import {WarehouseParamModel} from '../warehouse/warehouse-param.model';

export class TaskInfoById {
  taskId: string;
  customerName: string;
  contactNumber: string;
  customerEmail: string;
  orderId: string;
  wareHouseId: string;
  dropLatitude: string;
  dropLongitude: string;
  amount: string;
  paymentType: string;
  deliveryDate: string;
  assignDrivers: string[];
  taskStatus: string;
  createdBy: string;
  modifiedBy: string;
  createdOn: string;
  modifiedOn: string;
  dropAddress: string;
  wareHouseDetails: WarehouseParamModel = new WarehouseParamModel();
  driverResponse: DriverInfo[];
  vehicleType: string;
}
