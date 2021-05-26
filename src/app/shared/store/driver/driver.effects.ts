import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as DriverActions from './driver.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {
  AddDriverSuccess, DeleteDriverSuccess,
  GetDriverListSuccess, GetDriverStatusListSuccess,
  UpdateDriverSuccess
} from './driver.actions';
import {DriverInfo} from '../../models/driver/driver-info';
import {DriverStatusInfo} from '../../models/driver/driver-status-info';

@Injectable()
export class DriverEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  addDriver = this.actions$.pipe(
    ofType(DriverActions.START_ADD_DRIVER),
    switchMap((driverData: DriverActions.StartAddDriver) => {
      return this.http.post<DriverInfo>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER'),
        driverData.payload)
        .pipe(
          map(driver => {
            return new AddDriverSuccess(driver);
          })
        );
    })
  );

  @Effect()
  getDriverInfo = this.actions$.pipe(
    ofType(DriverActions.START_GET_DRIVER_LIST),
    switchMap((driver: DriverActions.StartGetListDriver) => {
      return this.http.get<DriverInfo[]>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER')
      + '?driverStatus=')
        .pipe(
          map(driverInfo => {
            return new GetDriverListSuccess(driverInfo);
          })
        );
    })
  );

  @Effect()
  updateDriver = this.actions$.pipe(
    ofType(DriverActions.START_UPDATE_DRIVER),
    switchMap((driverData: DriverActions.StartUpdateDriver) => {
      return this.http.patch<DriverInfo>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER'),
        driverData.payload)
        .pipe(
          map(driver => {
            return new UpdateDriverSuccess(driver);
          })
        );
    })
  );

  @Effect()
  deleteDriver = this.actions$.pipe(
    ofType(DriverActions.START_DELETE_DRIVER),
    switchMap((driverData: DriverActions.StartDeleteDriver) => {
      return this.http.delete<DriverInfo>(
        this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER') + '/' +
        driverData.payload)
        .pipe(
          map(driver => {
            return new DeleteDriverSuccess(driver);
          })
        );
    })
  );

  @Effect()
  getDriverStatusInfo = this.actions$.pipe(
    ofType(DriverActions.START_GET_DRIVER_STATUS_LIST),
    switchMap((driver: DriverActions.StartGetListDriverStatus) => {
      return this.http.get<DriverStatusInfo>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_DRIVER_STATUS'))
        .pipe(
          map(driverStatusInfo => {
            return new GetDriverStatusListSuccess(driverStatusInfo);
          })
        );
    })
  );
}
