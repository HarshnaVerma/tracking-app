import {Injectable} from '@angular/core';
import {TaskStatusInfo} from '../models/task/task-status-info';
import {Observable, of, Subject, Subscription, timer} from 'rxjs';
import {MapService} from './map.service';
import {DriverStatusInfo} from '../models/driver/driver-status-info';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {UserGeoLocation} from '../models/user-geo-location/user-geo-location';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  taskStatusInfo: TaskStatusInfo;
  driverStatusData = new Subject<any>();
  taskStatusData = new Subject<any>();
 // userGeoLocationData: UserGeoLocation = new UserGeoLocation();
  userGeoLocationData = new Subject<UserGeoLocation>();

  constructor(private mapService: MapService, private http: HttpClient,
              private configService: ConfigService) {
  }

  setTaskStatusInfo(taskStatusInfo) {
    this.taskStatusInfo = taskStatusInfo;
  }

  getTaskStatusInfo() {
    return this.taskStatusInfo;
  }

  getDriverStatusInfoData() {
    return this.http.get<DriverStatusInfo>(this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER_STATUS'))
      .subscribe(response => {
        if (response !== null) {
          this.driverStatusData.next({
            freeDrivers: response.freeDrivers,
            busyDrivers: response.busyDrivers,
            inactiveDrivers: response.inactiveDrivers
          });
        }
      });
  }

  getTaskStatusInfoData() {
    return this.http.get<TaskStatusInfo>( this.configService.get(this.configService.apiBaseUrlForTaskService, 'URL_TASK_STATUS'))
      .subscribe(response => {
        if (response !== null) {
          this.taskStatusData.next({
            unAssignedTasks: response.unassigned,
            assignedTasks: response.assigned,
            completedTasks: response.completed,
          });
        }
      });
  }
}
