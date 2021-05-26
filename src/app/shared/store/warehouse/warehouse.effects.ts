import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as WarehouseActions from './warehouse.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {WarehouseInfo} from '../../models/warehouse/warehouse-info';
import {
  AddWarehouseSuccess,
  DeleteWarehouseSuccess, GetWareHouseByIdSuccess,
  GetWarehouseListSuccess,
  UpdateWarehouseSuccess
} from './warehouse.actions';
import {WarehouseParamModel} from "../../models/warehouse/warehouse-param.model";

const httpHeaders = new HttpHeaders();
httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class WarehouseEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  addWarehouse = this.actions$.pipe(
    ofType(WarehouseActions.START_ADD_WAREHOUSE),
    switchMap((warehouseData: WarehouseActions.StartAddWarehouse) => {
      return this.http.post<WarehouseInfo>( this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_WAREHOUSE'),
        warehouseData.payload)
        .pipe(
          map(warehouse => {
            return new AddWarehouseSuccess(warehouse);
          })
        );
    })
  );

  @Effect()
  getWarehouseInfo = this.actions$.pipe(
    ofType(WarehouseActions.START_GET_WAREHOUSE_LIST),
    switchMap((warehouse: WarehouseActions.StartGetListWarehouse) => {
      return this.http.get<WarehouseInfo[]>( this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_WAREHOUSE'))
        .pipe(
          map(warehouseInfo => {
            return new GetWarehouseListSuccess(warehouseInfo);
          })
        );
    })
  );

  @Effect()
  updateWarehouse = this.actions$.pipe(
    ofType(WarehouseActions.START_UPDATE_WAREHOUSE),
    switchMap((warehouseData: WarehouseActions.StartUpdateWarehouse) => {
      return this.http.patch<WarehouseInfo>(this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_UPDATE_WAREHOUSE') + '/' +
        warehouseData.payload , {headers: httpHeaders})
        .pipe(
          map(warehouse => {
            return new UpdateWarehouseSuccess(warehouse);
          })
        );
    })
  );

  @Effect()
  deleteWarehouse = this.actions$.pipe(
    ofType(WarehouseActions.START_DELETE_WAREHOUSE),
    switchMap((warehouseData: WarehouseActions.StartDeleteWarehouse) => {
      return this.http.delete<WarehouseInfo>(
        this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_DELETE_WAREHOUSE') + '/' +
        warehouseData.payload)
        .pipe(
          map(warehouse => {
            return new DeleteWarehouseSuccess(warehouse);
          })
        );
    })
  );

  @Effect()
  getWarehouseById = this.actions$.pipe(
    ofType(WarehouseActions.START_GET_WAREHOUSE_BY_ID),
    switchMap((warehouse: WarehouseActions.StartGetWareHouseById) => {
      return this.http.get<WarehouseParamModel>( this.configService.get(this.configService.apiBaseUrlForWarehouseService,
        'URL_GET_WAREHOUSE_BY_ID') + '/' + warehouse.payload)
        .pipe(
          map(warehouseModel => {
            return new GetWareHouseByIdSuccess(warehouseModel);
          })
        );
    })
  );
}
