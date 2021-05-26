import {Component, Input, OnInit} from '@angular/core';
import {TaskInfoById} from '../../../models/task/task-info-by-id';

@Component({
  selector: 'app-task-customer',
  templateUrl: './task-customer.component.html',
  styleUrls: ['./task-customer.component.scss']
})
export class TaskCustomerComponent implements OnInit {

  @Input() taskInfo: TaskInfoById;
  @Input()dropAddress: string;
  constructor() { }

  ngOnInit(): void {
  }

}
