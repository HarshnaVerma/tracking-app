import {Component, Inject, Input, NgZone, OnInit} from '@angular/core';
import {TaskInfoById} from '../../../models/task/task-info-by-id';
import {MapService} from '../../../services/map.service';
import {MapsAPILoader} from '@agm/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() taskInfo: TaskInfoById;
  @Input()wareHouseAddress: string;
  amount: number;
  constructor(private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dialog: MatDialog, public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<TaskDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
 //   this.amount = Number(this.taskInfo.amount) + 1000;
  //  this.loadWareHouseLocation().then();
  }

  getAmount(amount) {
    return Number(amount) + 1000;
  }



}
