import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as TaskActions from './task.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {TaskInfo} from '../../models/task/task-info';
import {
  AddTaskSuccess,
  GetTaskByIdSuccess,
  GetTaskStatusListSuccess,
  UpdateTaskToAssignDriversSuccess
} from './task.actions';
import {TaskStatusInfo} from '../../models/task/task-status-info';
import {TaskParamModel} from '../../models/task/task-param.model';
import {TaskInfoById} from '../../models/task/task-info-by-id';

const httpHeaders = new HttpHeaders();
httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  addTask = this.actions$.pipe(
    ofType(TaskActions.START_ADD_TASK),
    switchMap((taskData: TaskActions.StartAddTask) => {
      return this.http.post<TaskInfo>( this.configService.get(this.configService.apiBaseUrlForTaskService, 'URL_TASK'),
        taskData.payload)
        .pipe(
          map(task => {
            return new AddTaskSuccess(task);
          })
        );
    })
  );

  @Effect()
  getTaskStatusInfo = this.actions$.pipe(
    ofType(TaskActions.START_GET_TASK_STATUS_LIST),
    switchMap((task: TaskActions.StartGetListTaskStatus) => {
      return this.http.get<TaskStatusInfo>( this.configService.get(this.configService.apiBaseUrlForTaskService, 'URL_TASK_STATUS'))
        .pipe(
          map(taskStatusInfo => {
            return new GetTaskStatusListSuccess(taskStatusInfo);
          })
        );
    })
  );

  @Effect()
  getTaskById = this.actions$.pipe(
    ofType(TaskActions.START_GET_TASK_BY_ID),
    switchMap((task: TaskActions.StartGetTaskById) => {
      return this.http.get<TaskParamModel>( this.configService.get(this.configService.apiBaseUrlForTaskService,
        'URL_GET_TASK_BY_ID') + '/' + task.payload)
        .pipe(
          map(taskModel => {
            return new GetTaskByIdSuccess(taskModel);
          })
        );
    })
  );

  @Effect()
  updateTaskToAssignDrivers = this.actions$.pipe(
    ofType(TaskActions.START_UPDATE_TASK_TO_ASSIGN_DRIVERS),
    switchMap((taskData: TaskActions.StartUpdateTaskByToAssignDrivers) => {
      return this.http.patch<TaskInfoById>(this.configService.get(this.configService.apiBaseUrlForTaskService, 'URL_TASK'),
        taskData.payload)
        .pipe(
          map(task => {
            return new UpdateTaskToAssignDriversSuccess(task);
          })
        );
    })
  );

  // @Effect()
  // deleteWarehouse = this.actions$.pipe(
  //   ofType(WarehouseActions.START_DELETE_WAREHOUSE),
  //   switchMap((warehouseData: WarehouseActions.StartDeleteWarehouse) => {
  //     return this.http.delete<WarehouseInfo>(
  //       this.configService.get(this.configService.apiBaseUrlForWarehouseService, 'URL_DELETE_WAREHOUSE') + '/' +
  //       warehouseData.payload)
  //       .pipe(
  //         map(warehouse => {
  //           return new DeleteWarehouseSuccess(warehouse);
  //         })
  //       );
  //   })
  // );
}
