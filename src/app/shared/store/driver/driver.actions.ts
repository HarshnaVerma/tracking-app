import {Action} from '@ngrx/store';
import {DriverInfo} from '../../models/driver/driver-info';
import {DriverParamModel} from '../../models/driver/driver-param.model';
import {DriverStatusInfo} from '../../models/driver/driver-status-info';

export const START_GET_DRIVER_LIST = '[Driver] Start Get Driver List';
export const GET_DRIVER_LIST_SUCCESS = '[Driver] Get Driver List Success';
export const START_ADD_DRIVER = '[Driver] Start Add Driver';
export const ADD_DRIVER_SUCCESS = '[Driver] Add Driver success';
export const START_UPDATE_DRIVER = '[Driver] Start Update Driver';
export const UPDATE_DRIVER_SUCCESS = '[Driver] Start Update Driver Success';
export const START_DELETE_DRIVER = '[Driver] Start Delete Driver';
export const DELETE_DRIVER_SUCCESS = '[Driver] Delete Driver success';
export const AFTER_UPDATE_DRIVER_SUCCESS = '[Driver] After Update Driver Success';
export const AFTER_DELETE_DRIVER_SUCCESS = '[Driver] After Delete Driver Success';
export const START_GET_DRIVER_STATUS_LIST = '[Driver] Start Get Driver Status List';
export const GET_DRIVER_STATUS_LIST_SUCCESS = '[Driver] Get Driver Status List Success';

export class StartGetListDriver implements Action {
  type: string = START_GET_DRIVER_LIST;
}

export class GetDriverListSuccess implements Action {
  type: string = GET_DRIVER_LIST_SUCCESS;
  constructor(public payload: DriverInfo[]) {
  }
}

export class StartAddDriver implements Action {
  type: string = START_ADD_DRIVER;
  constructor(public payload: DriverParamModel) {
  }
}

export class AddDriverSuccess implements Action {
  type: string = ADD_DRIVER_SUCCESS;
  constructor(public payload: DriverInfo) {
  }
}

export class StartUpdateDriver implements Action {
  type: string = START_UPDATE_DRIVER;
  constructor(public payload: DriverParamModel) {
  }
}

export class UpdateDriverSuccess implements Action {
  type: string = UPDATE_DRIVER_SUCCESS;
  constructor(public payload: DriverInfo) {
  }
}

export class StartDeleteDriver implements Action {
  type: string = START_DELETE_DRIVER;
  constructor(public payload: string) {
  }
}

export class DeleteDriverSuccess implements Action {
  type: string = DELETE_DRIVER_SUCCESS;
  constructor(public payload: DriverInfo) {
  }
}

export class AfterUpdateDriverSuccess implements Action {
  type: string = AFTER_UPDATE_DRIVER_SUCCESS;
  constructor(public payload: DriverInfo[]) {
  }
}

export class AfterDeleteDriverSuccess implements Action {
  type: string = AFTER_DELETE_DRIVER_SUCCESS;
  constructor(public payload: DriverInfo[]) {
  }
}


export class StartGetListDriverStatus implements Action {
  type: string = START_GET_DRIVER_STATUS_LIST;
}

export class GetDriverStatusListSuccess implements Action {
  type: string = GET_DRIVER_STATUS_LIST_SUCCESS;
  constructor(public payload: DriverStatusInfo) {
  }
}


export type DriverActions = any;
