import {Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {AssignDriverToTaskComponent} from '../assign-driver-to-task/assign-driver-to-task.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import {TaskInfo} from '../../../models/task/task-info';
import {MapService} from '../../../services/map.service';

@Component({
  selector: 'app-unassigned-task',
  templateUrl: './unassigned-task.component.html',
  styleUrls: ['./unassigned-task.component.scss']
})
export class UnassignedTaskComponent implements OnInit {

  @Input()searchValueText: string;
  @Input()unAssignedTaskInfo: TaskInfo[];
  dropAddress: string;
  constructor(public customizerService: CustomizerService, private dialog: MatDialog,
              public dialogService: DialogService, private mapService: MapService) { }

  ngOnInit(): void {
  }

  assignDriverToTask(task) {
    this.dialog.open(AssignDriverToTaskComponent, {
      width: '800px',
      data: {taskData: task},
      backdropClass: 'backdropBackground',
    });
  }

  getTime(time) {
    return time.split(' ')[1];
  }
}
