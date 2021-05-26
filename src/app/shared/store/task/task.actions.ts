import {Action} from '@ngrx/store';
import {TaskParamModel} from '../../models/task/task-param.model';
import {TaskInfo} from '../../models/task/task-info';
import {TaskStatusInfo} from '../../models/task/task-status-info';
import {TaskInfoById} from '../../models/task/task-info-by-id';

export const START_GET_TASK_STATUS_LIST = '[Task] Start Get Task Status List';
export const GET_TASK_STATUS_LIST_SUCCESS = '[Task] Get Task Status List Success';
export const START_ADD_TASK = '[Task] Start Add Task';
export const ADD_TASK_SUCCESS = '[Task] Add Task success';
export const START_GET_TASK_BY_ID = '[Task] Start Get Task By Id';
export const GET_TASK_BY_ID_SUCCESS = '[Task] Get Task By Id Success';
export const START_UPDATE_TASK_TO_ASSIGN_DRIVERS = '[Task] Start Update Task To Assign Drivers';
export const UPDATE_TASK_TO_ASSIGN_DRIVERS_SUCCESS = '[Task] Update Task To Assign Drivers Success';
// export const START_DELETE_ORDER = '[Order] Start Delete Order';
// export const DELETE_ORDER_SUCCESS = '[Order] Delete Order success';
// export const AFTER_UPDATE_ORDER_SUCCESS = '[Order] After Update Order Success';
// export const AFTER_DELETE_ORDER_SUCCESS = '[Order] After Delete Order Success';

export class StartGetListTaskStatus implements Action {
  type: string = START_GET_TASK_STATUS_LIST;
}

export class GetTaskStatusListSuccess implements Action {
  type: string = GET_TASK_STATUS_LIST_SUCCESS;
  constructor(public payload: TaskStatusInfo) {
  }
}

export class StartAddTask implements Action {
  type: string = START_ADD_TASK;
  constructor(public payload: TaskParamModel) {
  }
}

export class AddTaskSuccess implements Action {
  type: string = ADD_TASK_SUCCESS;
  constructor(public payload: TaskInfo) {
  }
}

export class StartGetTaskById implements Action {
  type: string = START_GET_TASK_BY_ID;
  constructor(public payload: string) {
  }
}

export class GetTaskByIdSuccess implements Action {
  type: string = GET_TASK_BY_ID_SUCCESS;
  constructor(public payload: TaskParamModel) {
  }
}

export class StartUpdateTaskByToAssignDrivers implements Action {
  type: string = START_UPDATE_TASK_TO_ASSIGN_DRIVERS;
  constructor(public payload: TaskParamModel) {
  }
}

export class UpdateTaskToAssignDriversSuccess implements Action {
  type: string = UPDATE_TASK_TO_ASSIGN_DRIVERS_SUCCESS;
  constructor(public payload: TaskInfoById) {
  }
}

// export class StartUpdateOrder implements Action {
//   type: string = START_UPDATE_ORDER;
//   constructor(public payload: string) {
//   }
// }
//
// export class UpdateOrderSuccess implements Action {
//   type: string = UPDATE_ORDER_SUCCESS;
//   constructor(public payload: OrdersInfo) {
//   }
// }
//
// export class StartDeleteOrder implements Action {
//   type: string = START_DELETE_ORDER;
//   constructor(public payload: string) {
//   }
// }
//
// export class DeleteOrderSuccess implements Action {
//   type: string = DELETE_ORDER_SUCCESS;
//   constructor(public payload: OrdersInfo) {
//   }
// }
//
// export class AfterUpdateOrderSuccess implements Action {
//   type: string = AFTER_UPDATE_ORDER_SUCCESS;
//   constructor(public payload: OrdersInfo[]) {
//   }
// }
//
// export class AfterDeleteOrderSuccess implements Action {
//   type: string = AFTER_DELETE_ORDER_SUCCESS;
//   constructor(public payload: OrdersInfo[]) {
//   }
// }


export type TaskActions = any;
