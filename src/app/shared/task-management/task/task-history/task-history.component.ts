import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskInfoById} from '../../../models/task/task-info-by-id';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskHistoryComponent implements OnInit {
  @Input() taskInfo: TaskInfoById;
  @Input()dropAddress: string;
  constructor() { }

  ngOnInit(): void {
  }

}
