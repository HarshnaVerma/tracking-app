import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {DriverAssignmentListComponent} from '../../driver/driver-assignment-list/driver-assignment-list.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MapService} from '../../../services/map.service';
import {MapsAPILoader} from '@agm/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TaskParamModel} from '../../../models/task/task-param.model';
import {StartAddTask, StartGetTaskById, StartUpdateTaskByToAssignDrivers} from '../../../store/task/task.actions';
import {TaskInfo} from '../../../models/task/task-info';
import {DialogService} from '../../../services/dialog.service';
import {TaskInfoById} from '../../../models/task/task-info-by-id';

@Component({
  selector: 'app-assign-driver-to-task',
  templateUrl: './assign-driver-to-task.component.html',
  styleUrls: ['./assign-driver-to-task.component.scss']
})
export class AssignDriverToTaskComponent implements OnInit, OnDestroy {

  selectedDrivers = [];
  taskInfoById: TaskInfoById = new TaskInfoById();
  taskInfo: TaskInfo;
  dropAddress: string;
  storeSubscription: Subscription;

  constructor(private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dialog: MatDialog, public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AssignDriverToTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.taskInfo = this.data.taskData;
    this.loadDropLocation().then();
    this.getTaskInfoById();
  }

  assignDriver() {
    this.dialog.open(DriverAssignmentListComponent, {
      width: '300px',
      data: {selectedDriver: this.selectedDrivers,
        vehicleType: this.taskInfoById.vehicleType ,
        depotLatitude: this.taskInfoById.wareHouseDetails.depotLatitude,
        depotLongitude: this.taskInfoById.wareHouseDetails.depotLongitude},
      backdropClass: 'backdropBackground'
    }).afterClosed().subscribe(response => {
      this.selectedDrivers = response;
    });
  }

  async loadDropLocation() {
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.taskInfo.dropLatitude)
      , Number(this.taskInfo.dropLongitude));
    // @ts-ignore
    this.dropAddress = googleMapReturnCurrentAddress.address;
  }

  getTaskInfoById() {
    this.store.dispatch(new StartGetTaskById(this.taskInfo.taskId));
    this.storeSubscription = this.store.select('task').subscribe(value => {
      if (value.fetch_task_success !== null) {
        this.taskInfoById = value.fetch_task_success;
      }
    });
  }

  saveTask() {
    const taskParam: TaskParamModel = new TaskParamModel();
    taskParam.taskId = this.taskInfo.taskId;
    taskParam.modifiedBy = sessionStorage.getItem('userId');
    taskParam.taskStatus = 'ASSIGNED';
    taskParam.assignDrivers = this.selectedDrivers;

    this.store.dispatch(new StartUpdateTaskByToAssignDrivers(taskParam));
    this.storeSubscription = this.store.select('task').subscribe(value => {
      console.log('val: ' + JSON.stringify(value));
      if (value.save_task_success !== null) {
        this.dialogService.openSuccessDialog('Driver Assigned Successfully');
      }
    });

  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
