import {Action} from '@ngrx/store';
import {OrdersInfo} from '../../models/order/orders-info';
import {OrderParamModel} from '../../models/order/order-param.model';

export const START_GET_ORDER_LIST = '[Order] Start Get Order List';
export const GET_ORDER_LIST_SUCCESS = '[Order] Get Order List Success';
export const START_ADD_ORDER = '[Order] Start Add Order';
export const ADD_ORDER_SUCCESS = '[Order] Add Order success';
export const START_UPDATE_ORDER = '[Order] Start Update Order';
export const UPDATE_ORDER_SUCCESS = '[Order] Start Order Driver Success';
export const START_DELETE_ORDER = '[Order] Start Delete Order';
export const DELETE_ORDER_SUCCESS = '[Order] Delete Order success';
export const AFTER_UPDATE_ORDER_SUCCESS = '[Order] After Update Order Success';
export const AFTER_DELETE_ORDER_SUCCESS = '[Order] After Delete Order Success';

export class StartGetListOrder implements Action {
  type: string = START_GET_ORDER_LIST;
}

export class GetOrderListSuccess implements Action {
  type: string = GET_ORDER_LIST_SUCCESS;
  constructor(public payload: OrdersInfo[]) {
  }
}

export class StartAddOrder implements Action {
  type: string = START_ADD_ORDER;
  constructor(public payload: OrderParamModel) {
  }
}

export class AddOrderSuccess implements Action {
  type: string = ADD_ORDER_SUCCESS;
  constructor(public payload: OrdersInfo) {
  }
}

export class StartUpdateOrder implements Action {
  type: string = START_UPDATE_ORDER;
  constructor(public payload: string) {
  }
}

export class UpdateOrderSuccess implements Action {
  type: string = UPDATE_ORDER_SUCCESS;
  constructor(public payload: OrdersInfo) {
  }
}

export class StartDeleteOrder implements Action {
  type: string = START_DELETE_ORDER;
  constructor(public payload: string) {
  }
}

export class DeleteOrderSuccess implements Action {
  type: string = DELETE_ORDER_SUCCESS;
  constructor(public payload: OrdersInfo) {
  }
}

export class AfterUpdateOrderSuccess implements Action {
  type: string = AFTER_UPDATE_ORDER_SUCCESS;
  constructor(public payload: OrdersInfo[]) {
  }
}

export class AfterDeleteOrderSuccess implements Action {
  type: string = AFTER_DELETE_ORDER_SUCCESS;
  constructor(public payload: OrdersInfo[]) {
  }
}


export type OrderActions = any;
