import {DriverInfo} from './driver-info';


export class DriverStatusInfo {
  freeDrivers: DriverInfo[];
  busyDrivers: DriverInfo[];
  inactiveDrivers: DriverInfo[];
}
