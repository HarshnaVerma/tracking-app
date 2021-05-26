import {WarehouseInfo} from '../warehouse/warehouse-info';
import {DriverInfo} from '../driver/driver-info';

export interface TaskInfo {
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
  colorCode: string;
  dropAddress: string;
  wareHouseDetails: WarehouseInfo;
  driverResponse: DriverInfo[];
}
