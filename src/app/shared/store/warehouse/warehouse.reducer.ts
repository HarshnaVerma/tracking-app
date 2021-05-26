import * as WarehouseActions from './warehouse.actions';
import {WarehouseInfo} from '../../models/warehouse/warehouse-info';
import {WarehouseParamModel} from '../../models/warehouse/warehouse-param.model';

export interface WarehouseState {
  WAREHOUSE_DATA: WarehouseInfo[];
  fetch_warehouse_error: string;
  save_warehouse_error: string;
  fetch_warehouse_success: WarehouseParamModel;
  save_warehouse_success: WarehouseParamModel;
}

const initialState: WarehouseState = {
  WAREHOUSE_DATA: [],
  fetch_warehouse_error: '',
  save_warehouse_error: '',
  fetch_warehouse_success: null,
  save_warehouse_success: null
};

export function warehouseReducer(state: WarehouseState = initialState, action: WarehouseActions.WarehouseActions) {
  switch (action.type) {
    case WarehouseActions.GET_WAREHOUSE_LIST_SUCCESS:
      return {
        ...state,
        fetch_warehouse_error: '',
        WAREHOUSE_DATA: [...action.payload]
      };
    case WarehouseActions.START_ADD_WAREHOUSE:
      return {
        ...state,
        fetch_warehouse_error: '',
        save_warehouse_success: null
      };
    case WarehouseActions.ADD_WAREHOUSE_SUCCESS:
      return {
        ...state,
        save_warehouse_error: '',
        save_warehouse_success: action.payload,
        WAREHOUSE_DATA: [...state.WAREHOUSE_DATA, action.payload]
      };
    case WarehouseActions.START_UPDATE_WAREHOUSE:
      return {
        ...state,
        fetch_warehouse_error: '',
        save_warehouse_success: null
      };
    case WarehouseActions.UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        save_warehouse_error: '',
        save_warehouse_success: action.payload
      };
    case WarehouseActions.AFTER_UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        save_warehouse_error: '',
        save_warehouse_success: null,
        WAREHOUSE_DATA: action.payload
      };
    case WarehouseActions.START_DELETE_WAREHOUSE:
      return {
        ...state,
        fetch_warehouse_error: '',
        save_warehouse_success: null
      };
    case WarehouseActions.DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        save_warehouse_error: '',
        save_warehouse_success: action.payload
      };
    case WarehouseActions.AFTER_DELETE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        save_warehouse_error: '',
        save_warehouse_success: null,
        WAREHOUSE_DATA: action.payload
      };
    case WarehouseActions.START_GET_WAREHOUSE_BY_ID:
      return {
        ...state,
        fetch_warehouse_error: '',
        fetch_warehouse_success: null
      };
    case WarehouseActions.GET_WAREHOUSE_BY_ID_SUCCESS:
      return {
        ...state,
        fetch_warehouse_error: '',
        fetch_warehouse_success: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
