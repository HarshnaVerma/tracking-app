import {DriverInfo} from '../../models/driver/driver-info';
import {DriverParamModel} from '../../models/driver/driver-param.model';
import * as DriverActions from './driver.actions';
import {DriverStatusInfo} from '../../models/driver/driver-status-info';

export interface DriverState {
  DRIVER_DATA: DriverInfo[];
  fetch_driver_error: string;
  save_driver_error: string;
  save_driver_success: DriverParamModel;
  fetch_driver_status_error: string;
  driver_status_info: DriverStatusInfo;
}

const initialState: DriverState = {
  DRIVER_DATA: [],
  fetch_driver_error: '',
  save_driver_error: '',
  save_driver_success: null,
  fetch_driver_status_error: '',
  driver_status_info: null
};

export function driverReducer(state: DriverState = initialState, action: DriverActions.DriverActions) {
  switch (action.type) {
    case DriverActions.START_GET_DRIVER_STATUS_LIST:
      return {
        ...state,
        fetch_driver_status_error: '',
        driver_status_info: null
      };
    case DriverActions.GET_DRIVER_STATUS_LIST_SUCCESS:
      return {
        ...state,
        fetch_driver_status_error: '',
        driver_status_info: action.payload
      };
    case DriverActions.GET_DRIVER_LIST_SUCCESS:
      return {
        ...state,
        fetch_driver_error: '',
        DRIVER_DATA: [...action.payload]
      };
    case DriverActions.START_ADD_DRIVER:
      return {
        ...state,
        fetch_driver_error: '',
        save_driver_success: null
      };
    case DriverActions.ADD_DRIVER_SUCCESS:
      return {
        ...state,
        save_driver_error: '',
        save_driver_success: action.payload,
        DRIVER_DATA: [...state.DRIVER_DATA, action.payload]
      };
    case DriverActions.START_UPDATE_DRIVER:
      return {
        ...state,
        fetch_driver_error: '',
        save_driver_success: null
      };
    case DriverActions.UPDATE_DRIVER_SUCCESS:
      return {
        ...state,
        save_driver_error: '',
        save_driver_success: action.payload
      };
    case DriverActions.AFTER_UPDATE_DRIVER_SUCCESS:
      return {
        ...state,
        save_driver_error: '',
        save_driver_success: null,
        DRIVER_DATA: action.payload
      };
    case DriverActions.START_DELETE_DRIVER:
      return {
        ...state,
        fetch_driver_error: '',
        save_driver_success: null
      };
    case DriverActions.DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        save_driver_error: '',
        save_driver_success: action.payload
      };
    case DriverActions.AFTER_DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        save_driver_error: '',
        save_driver_success: null,
        DRIVER_DATA: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
