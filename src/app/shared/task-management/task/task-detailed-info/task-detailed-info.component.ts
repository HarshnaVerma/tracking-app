import {Component, Inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {MapsAPILoader} from '@agm/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {FormBuilder} from '@angular/forms';
import {TaskInfo} from '../../../models/task/task-info';
import {TaskInfoById} from '../../../models/task/task-info-by-id';
import {StartGetTaskById} from '../../../store/task/task.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-detailed-info',
  templateUrl: './task-detailed-info.component.html',
  styleUrls: ['./task-detailed-info.component.scss']
})
export class TaskDetailedInfoComponent implements OnInit, OnDestroy {

  taskInfo: TaskInfo;
  taskInfoById: TaskInfoById = new TaskInfoById();
  storeSubscription: Subscription;
  dropAddress: string;
  wareHouseAddress: string;
  constructor(private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dialog: MatDialog, public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<TaskDetailedInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.taskInfo = this.data.taskData;
    this.loadDropLocation().then();
    this.getTaskInfoById();
  }

  async loadDropLocation() {
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.taskInfo.dropLatitude)
      , Number(this.taskInfo.dropLongitude));
    // @ts-ignore
    this.dropAddress = googleMapReturnCurrentAddress.address;
  }

  async loadWareHouseLocation() {
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.taskInfoById.
        wareHouseDetails.depotLatitude)
      , Number(this.taskInfoById.
        wareHouseDetails.depotLongitude));
    // @ts-ignore
    this.wareHouseAddress = googleMapReturnCurrentAddress.address;
  }

  getTaskInfoById() {
    this.store.dispatch(new StartGetTaskById(this.taskInfo.taskId));
    this.storeSubscription = this.store.select('task').subscribe(value => {
      if (value.fetch_task_success !== null) {
        this.taskInfoById = value.fetch_task_success;
        this.loadWareHouseLocation().then();
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
