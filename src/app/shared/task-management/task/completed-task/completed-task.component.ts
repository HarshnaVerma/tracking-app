import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {DialogService} from '../../../services/dialog.service';
import {TaskInfo} from '../../../models/task/task-info';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.scss']
})
export class CompletedTaskComponent implements OnInit, AfterContentChecked {
  @Input()searchValueText: string;
  loadPage: boolean;
  @Input()completedTaskInfo: TaskInfo[];
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
