import * as VehicleActions from './vehicle.actions';
import {VehicleInfo} from '../../models/vehicle/vehicle-info';
import {VehicleParamModel} from '../../models/vehicle/vehicle-param.model';

export interface VehicleState {
  VEHICLE_DATA: VehicleInfo[];
  fetch_vehicle_error: string;
  save_vehicle_error: string;
  save_vehicle_success: VehicleParamModel;
}

const initialState: VehicleState = {
  VEHICLE_DATA: [],
  fetch_vehicle_error: '',
  save_vehicle_error: '',
  save_vehicle_success: null
};

export function vehicleReducer(state: VehicleState = initialState, action: VehicleActions.VehicleActions) {
  switch (action.type) {
    case VehicleActions.START_GET_VEHICLE_LIST:
      return {
        ...state,
        fetch_vehicle_error: '',
        VEHICLE_DATA: []
      };
    case VehicleActions.GET_VEHICLE_LIST_SUCCESS:
      return {
        ...state,
        fetch_vehicle_error: '',
        VEHICLE_DATA: [...action.payload]
      };
    case VehicleActions.START_ADD_VEHICLE:
      return {
        ...state,
        fetch_vehicle_error: '',
        save_vehicle_success: null
      };
    case VehicleActions.ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        save_vehicle_error: '',
        save_vehicle_success: action.payload
      };
    case VehicleActions.START_UPDATE_VEHICLE:
      return {
        ...state,
        fetch_vehicle_error: '',
        save_vehicle_success: null
      };
    case VehicleActions.UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        save_vehicle_error: '',
        save_vehicle_success: action.payload
      };
    case VehicleActions.AFTER_UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        save_vehicle_error: '',
        save_vehicle_success: null,
        VEHICLE_DATA: action.payload
      };
    case VehicleActions.START_DELETE_VEHICLE:
      return {
        ...state,
        fetch_vehicle_error: '',
        save_vehicle_success: null
      };
    case VehicleActions.DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        save_vehicle_error: '',
        save_vehicle_success: action.payload
      };
    case VehicleActions.AFTER_DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        save_vehicle_error: '',
        save_vehicle_success: null,
        VEHICLE_DATA: action.payload
      };
    default:
      return {
        ...state
      };
  }

}
