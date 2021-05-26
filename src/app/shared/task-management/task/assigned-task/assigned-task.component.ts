import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {DialogService} from '../../../services/dialog.service';
import {TaskInfo} from '../../../models/task/task-info';

@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.scss']
})
export class AssignedTaskComponent implements OnInit, AfterContentChecked {

  @Input()searchValueText: string;
  loadPage: boolean;
  @Input()assignedTaskInfo: TaskInfo[];
  constructor(public customizerService: CustomizerService, public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.loadPage = true;
  }

  getTime(time) {
    return time.split(' ')[1];
  }

}
