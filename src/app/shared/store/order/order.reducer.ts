import * as OrderActions from './order.actions';
import {OrdersInfo} from '../../models/order/orders-info';
import {OrderParamModel} from '../../models/order/order-param.model';

export interface OrderState {
  ORDER_DATA: OrdersInfo[];
  fetch_order_error: string;
  save_order_error: string;
  save_order_success: OrderParamModel;
}

const initialState: OrderState = {
  ORDER_DATA: [],
  fetch_order_error: '',
  save_order_error: '',
  save_order_success: null
};

export function orderReducer(state: OrderState = initialState, action: OrderActions.OrderActions) {
  switch (action.type) {
    case OrderActions.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetch_order_error: '',
        ORDER_DATA: [...action.payload]
      };
    case OrderActions.START_ADD_ORDER:
      return {
        ...state,
        fetch_order_error: '',
        save_order_success: null
      };
    case OrderActions.ADD_ORDER_SUCCESS:
      return {
        ...state,
        save_order_error: '',
        save_order_success: action.payload,
        ORDER_DATA: [...state.ORDER_DATA, action.payload]
      };
    case OrderActions.START_UPDATE_ORDER:
      return {
        ...state,
        fetch_order_error: '',
        save_order_success: null
      };
    case OrderActions.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        save_order_error: '',
        save_order_success: action.payload
      };
    case OrderActions.AFTER_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        save_order_error: '',
        save_order_success: null,
        ORDER_DATA: action.payload
      };
    case OrderActions.START_DELETE_ORDER:
      return {
        ...state,
        fetch_order_error: '',
        save_order_success: null
      };
    case OrderActions.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        save_order_error: '',
        save_order_success: action.payload
      };
    case OrderActions.AFTER_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        save_order_error: '',
        save_order_success: null,
        ORDER_DATA: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
