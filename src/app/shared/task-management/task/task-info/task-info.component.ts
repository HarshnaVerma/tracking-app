import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TaskInfo} from '../../../models/task/task-info';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {DataSharingService} from '../../../services/data-sharing.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit, OnDestroy {

  @Input()searchValue: string;
  unAssignedTasks: TaskInfo[];
  assignedTasks: TaskInfo[];
  completedTasks: TaskInfo[];
  storeSubscription: Subscription;
  dropAddress: string;
  // interval = setInterval(() => {
  //   this.dataSharingService.getTaskStatusInfoData();
  // }, 5000);
  intervalSubscription: Subscription;
  constructor(public store: Store<fromApp.AppState>, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.intervalSubscription = Observable.interval(5000)
      .subscribe(() => {
        this.dataSharingService.getTaskStatusInfoData();
      });
    this.dataSharingService.getTaskStatusInfoData();
    this.getTaskStatusInfoSubjectData();
  }

  getTaskStatusInfoSubjectData() {
    this.storeSubscription = this.dataSharingService.taskStatusData.subscribe(value => {
      this.unAssignedTasks = value.unAssignedTasks;
      this.assignedTasks = value.assignedTasks;
      this.completedTasks = value.completedTasks;
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
     // this.interval
    }
  }
}
