import {Action} from '@ngrx/store';
import {VehicleInfo} from '../../models/vehicle/vehicle-info';
import {VehicleParamModel} from '../../models/vehicle/vehicle-param.model';

export const START_GET_VEHICLE_LIST = '[Vehicle] Start Get Vehicle List';
export const GET_VEHICLE_LIST_SUCCESS = '[Vehicle] Get Vehicle List Success';
export const START_ADD_VEHICLE = '[Vehicle] Start Add Vehicle';
export const ADD_VEHICLE_SUCCESS = '[Vehicle] Add Vehicle success';
export const START_UPDATE_VEHICLE = '[Vehicle] Start Update Vehicle';
export const UPDATE_VEHICLE_SUCCESS = '[Vehicle] Start Vehicle Driver Success';
export const START_DELETE_VEHICLE = '[Vehicle] Start Delete Vehicle';
export const DELETE_VEHICLE_SUCCESS = '[Vehicle] Delete Vehicle success';
export const AFTER_UPDATE_VEHICLE_SUCCESS = '[Vehicle] After Update Vehicle Success';
export const AFTER_DELETE_VEHICLE_SUCCESS = '[Vehicle] After Delete Vehicle Success';

export class StartGetListVehicle implements Action {
  type: string = START_GET_VEHICLE_LIST;
}

export class GetVehicleListSuccess implements Action {
  type: string = GET_VEHICLE_LIST_SUCCESS;
  constructor(public payload: VehicleInfo[]) {
  }
}

export class StartAddVehicle implements Action {
  type: string = START_ADD_VEHICLE;
  constructor(public payload: VehicleParamModel) {
  }
}

export class AddVehicleSuccess implements Action {
  type: string = ADD_VEHICLE_SUCCESS;
  constructor(public payload: VehicleInfo) {
  }
}

export class StartUpdateVehicle implements Action {
  type: string = START_UPDATE_VEHICLE;
  constructor(public payload: VehicleParamModel) {
  }
}

export class UpdateVehicleSuccess implements Action {
  type: string = UPDATE_VEHICLE_SUCCESS;
  constructor(public payload: VehicleInfo) {
  }
}

export class StartDeleteVehicle implements Action {
  type: string = START_DELETE_VEHICLE;
  constructor(public payload: string) {
  }
}

export class DeleteVehicleSuccess implements Action {
  type: string = DELETE_VEHICLE_SUCCESS;
  constructor(public payload: VehicleInfo) {
  }
}

export class AfterUpdateVehicleSuccess implements Action {
  type: string = AFTER_UPDATE_VEHICLE_SUCCESS;
  constructor(public payload: VehicleInfo[]) {
  }
}

export class AfterDeleteVehicleSuccess implements Action {
  type: string = AFTER_DELETE_VEHICLE_SUCCESS;
  constructor(public payload: VehicleInfo[]) {
  }
}


export type VehicleActions = any;
