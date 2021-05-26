import * as TaskActions from './task.actions';
import {TaskInfo} from '../../models/task/task-info';
import {TaskParamModel} from '../../models/task/task-param.model';
import {TaskStatusInfo} from '../../models/task/task-status-info';
import {TaskInfoById} from '../../models/task/task-info-by-id';

export interface TaskState {
  TASK_DATA: TaskInfo[];
  fetch_task_status_error: string;
  fetch_task_error: string;
  save_task_error: string;
  save_task_success: TaskParamModel;
  task_status_info: TaskStatusInfo;
  fetch_task_success: TaskInfoById;
}

const initialState: TaskState = {
  TASK_DATA: [],
  fetch_task_status_error: '',
  fetch_task_error: '',
  save_task_error: '',
  save_task_success: null,
  task_status_info: null,
  fetch_task_success: null
};

export function taskReducer(state: TaskState = initialState, action: TaskActions.TaskActions) {
  switch (action.type) {
    case TaskActions.START_GET_TASK_STATUS_LIST:
      return {
        ...state,
        fetch_task_status_error: '',
        task_status_info: null
      };
    case TaskActions.GET_TASK_STATUS_LIST_SUCCESS:
      return {
        ...state,
        fetch_task_status_error: '',
        task_status_info: action.payload
      };
    case TaskActions.START_ADD_TASK:
      return {
        ...state,
        fetch_task_error: '',
        save_task_success: null
      };
    case TaskActions.ADD_TASK_SUCCESS:
      return {
        ...state,
        save_task_error: '',
        save_task_success: action.payload,
        TASK_DATA: [...state.TASK_DATA, action.payload]
      };
    case TaskActions.START_GET_TASK_BY_ID:
      return {
        ...state,
        fetch_task_error: '',
        fetch_task_success: null
      };
    case TaskActions.GET_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        fetch_task_error: '',
        fetch_task_success: action.payload
      };
    case TaskActions.START_UPDATE_TASK_TO_ASSIGN_DRIVERS:
      return {
        ...state,
        fetch_task_error: '',
        save_task_success: null
      };
    case TaskActions.UPDATE_TASK_TO_ASSIGN_DRIVERS_SUCCESS:
      return {
        ...state,
        save_task_error: '',
        save_task_success: action.payload
      };
    // case OrderActions.START_UPDATE_ORDER:
    //   return {
    //     ...state,
    //     fetch_order_error: '',
    //     save_order_success: null
    //   };
    // case OrderActions.UPDATE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     save_order_error: '',
    //     save_order_success: action.payload
    //   };
    // case OrderActions.AFTER_UPDATE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     save_order_error: '',
    //     save_order_success: null,
    //     ORDER_DATA: action.payload
    //   };
    // case OrderActions.START_DELETE_ORDER:
    //   return {
    //     ...state,
    //     fetch_order_error: '',
    //     save_order_success: null
    //   };
    // case OrderActions.DELETE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     save_order_error: '',
    //     save_order_success: action.payload
    //   };
    // case OrderActions.AFTER_DELETE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     save_order_error: '',
    //     save_order_success: null,
    //     ORDER_DATA: action.payload
    //   };
    default:
      return {
        ...state
      };
  }

}
