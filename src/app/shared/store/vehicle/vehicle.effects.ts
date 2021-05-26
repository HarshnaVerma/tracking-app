import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as VehicleActions from './vehicle.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {VehicleInfo} from '../../models/vehicle/vehicle-info';
import {AddVehicleSuccess, DeleteVehicleSuccess, GetVehicleListSuccess, UpdateVehicleSuccess} from './vehicle.actions';

const httpHeaders = new HttpHeaders();
httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class VehicleEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  addVehicle = this.actions$.pipe(
    ofType(VehicleActions.START_ADD_VEHICLE),
    switchMap((vehicleData: VehicleActions.StartAddVehicle) => {
      return this.http.post<VehicleInfo>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_VEHICLE'),
        vehicleData.payload)
        .pipe(
          map(vehicle => {
            return new AddVehicleSuccess(vehicle);
          })
        );
    })
  );

  @Effect()
  getVehicleInfo = this.actions$.pipe(
    ofType(VehicleActions.START_GET_VEHICLE_LIST),
    switchMap((vehicle: VehicleActions.StartGetListVehicle) => {
      return this.http.get<VehicleInfo[]>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_VEHICLE'))
        .pipe(
          map(vehicleInfo => {
            return new GetVehicleListSuccess(vehicleInfo);
          })
        );
    })
  );

  @Effect()
  updateVehicle = this.actions$.pipe(
    ofType(VehicleActions.START_UPDATE_VEHICLE),
    switchMap((vehicleData: VehicleActions.StartUpdateVehicle) => {
      return this.http.patch<VehicleInfo>(this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_VEHICLE'),
        vehicleData.payload)
        .pipe(
          map(vehicle => {
            return new UpdateVehicleSuccess(vehicle);
          })
        );
    })
  );

  @Effect()
  deleteVehicle = this.actions$.pipe(
    ofType(VehicleActions.START_DELETE_VEHICLE),
    switchMap((vehicleData: VehicleActions.StartDeleteVehicle) => {
      return this.http.delete<VehicleInfo>(
        this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_VEHICLE') + '/' +
        vehicleData.payload)
        .pipe(
          map(vehicle => {
            return new DeleteVehicleSuccess(vehicle);
          })
        );
    })
  );
}
