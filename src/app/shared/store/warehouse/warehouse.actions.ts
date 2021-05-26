import {Action} from '@ngrx/store';
import {WarehouseInfo} from '../../models/warehouse/warehouse-info';
import {WarehouseParamModel} from '../../models/warehouse/warehouse-param.model';

export const START_GET_WAREHOUSE_LIST = '[Warehouse] Start Get Warehouse List';
export const GET_WAREHOUSE_LIST_SUCCESS = '[Warehouse] Get Warehouse List Success';
export const START_ADD_WAREHOUSE = '[Warehouse] Start Add Warehouse';
export const ADD_WAREHOUSE_SUCCESS = '[Warehouse] Add Warehouse success';
export const START_UPDATE_WAREHOUSE = '[Warehouse] Start Update Warehouse';
export const UPDATE_WAREHOUSE_SUCCESS = '[Warehouse] Start Warehouse Driver Success';
export const START_DELETE_WAREHOUSE = '[Warehouse] Start Delete Warehouse';
export const DELETE_WAREHOUSE_SUCCESS = '[Warehouse] Delete Warehouse success';
export const AFTER_UPDATE_WAREHOUSE_SUCCESS = '[Warehouse] After Update Warehouse Success';
export const AFTER_DELETE_WAREHOUSE_SUCCESS = '[Warehouse] After Delete Warehouse Success';
export const START_GET_WAREHOUSE_BY_ID = '[Warehouse] Start Get Warehouse By Id';
export const GET_WAREHOUSE_BY_ID_SUCCESS = '[Warehouse] Get Warehouse By Id Success';

export class StartGetListWarehouse implements Action {
  type: string = START_GET_WAREHOUSE_LIST;
}

export class GetWarehouseListSuccess implements Action {
  type: string = GET_WAREHOUSE_LIST_SUCCESS;
  constructor(public payload: WarehouseInfo[]) {
  }
}

export class StartAddWarehouse implements Action {
  type: string = START_ADD_WAREHOUSE;
  constructor(public payload: WarehouseParamModel) {
  }
}

export class AddWarehouseSuccess implements Action {
  type: string = ADD_WAREHOUSE_SUCCESS;
  constructor(public payload: WarehouseInfo) {
  }
}

export class StartUpdateWarehouse implements Action {
  type: string = START_UPDATE_WAREHOUSE;
  constructor(public payload: string) {
  }
}

export class UpdateWarehouseSuccess implements Action {
  type: string = UPDATE_WAREHOUSE_SUCCESS;
  constructor(public payload: WarehouseInfo) {
  }
}

export class StartDeleteWarehouse implements Action {
  type: string = START_DELETE_WAREHOUSE;
  constructor(public payload: string) {
  }
}

export class DeleteWarehouseSuccess implements Action {
  type: string = DELETE_WAREHOUSE_SUCCESS;
  constructor(public payload: WarehouseInfo) {
  }
}

export class AfterUpdateWarehouseSuccess implements Action {
  type: string = AFTER_UPDATE_WAREHOUSE_SUCCESS;
  constructor(public payload: WarehouseInfo[]) {
  }
}

export class AfterDeleteWarehouseSuccess implements Action {
  type: string = AFTER_DELETE_WAREHOUSE_SUCCESS;
  constructor(public payload: WarehouseInfo[]) {
  }
}

export class StartGetWareHouseById implements Action {
  type: string = START_GET_WAREHOUSE_BY_ID;
  constructor(public payload: string) {
  }
}

export class GetWareHouseByIdSuccess implements Action {
  type: string = GET_WAREHOUSE_BY_ID_SUCCESS;
  constructor(public payload: WarehouseInfo) {
  }
}


export type WarehouseActions = any;
