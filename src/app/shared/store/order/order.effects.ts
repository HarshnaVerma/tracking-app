import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as OrderActions from './order.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {OrdersInfo} from '../../models/order/orders-info';
import {AddOrderSuccess, DeleteOrderSuccess, GetOrderListSuccess} from './order.actions';

const httpHeaders = new HttpHeaders();
httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  addOrder = this.actions$.pipe(
    ofType(OrderActions.START_ADD_ORDER),
    switchMap((orderData: OrderActions.StartAddOrder) => {
      return this.http.post<OrdersInfo>( this.configService.get(this.configService.apiBaseUrlForOrderService, 'URL_ADD_ORDER'),
        orderData.payload)
        .pipe(
          map(order => {
            return new AddOrderSuccess(order);
          })
        );
    })
  );

  @Effect()
  getOrderInfo = this.actions$.pipe(
    ofType(OrderActions.START_GET_ORDER_LIST),
    switchMap((order: OrderActions.StartGetListOrder) => {
      return this.http.get<OrdersInfo[]>( this.configService.get(this.configService.apiBaseUrlForOrderService, 'URL_ORDER'))
        .pipe(
          map(orderInfo => {
            return new GetOrderListSuccess(orderInfo);
          })
        );
    })
  );

  // @Effect()
  // updateWarehouse = this.actions$.pipe(
  //   ofType(WarehouseActions.START_UPDATE_WAREHOUSE),
  //   switchMap((warehouseData: WarehouseActions.StartUpdateWarehouse) => {
  //     return this.http.patch<WarehouseInfo>(this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_UPDATE_WAREHOUSE') + '/' +
  //       warehouseData.payload , {headers: httpHeaders})
  //       .pipe(
  //         map(warehouse => {
  //           return new UpdateWarehouseSuccess(warehouse);
  //         })
  //       );
  //   })
  // );
  //
  @Effect()
  deleteOrder = this.actions$.pipe(
    ofType(OrderActions.START_DELETE_ORDER),
    switchMap((orderData: OrderActions.StartDeleteOrder) => {
      return this.http.delete<OrdersInfo>(
        this.configService.get(this.configService.apiBaseUrlForOrderService , 'URL_ORDER') + '/' +
        orderData.payload)
        .pipe(
          map(order => {
            return new DeleteOrderSuccess(order);
          })
        );
    })
  );
}
