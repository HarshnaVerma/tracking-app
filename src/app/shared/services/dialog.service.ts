import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../dialog/error-dialog/error-dialog.component';
import {SuccessDialogComponent} from '../dialog/success-dialog/success-dialog.component';
import {Router} from '@angular/router';
import {TaskDetailedInfoComponent} from '../task-management/task/task-detailed-info/task-detailed-info.component';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog, private router: Router) {
  }

  openErrorDialog(message) {
    this.dialog.open(ErrorDialogComponent, {
      height: '200px',
      width: '400px',
      data: message
    }).afterClosed().subscribe(() => {

    });
  }

  openSuccessDialog(message) {
    this.dialog.open(SuccessDialogComponent, {
      height: '200px',
      width: '400px',
      data: message
    });
  }

  taskDetailedInfo(task) {
    this.dialog.open(TaskDetailedInfoComponent, {
      width: '800px',
      data: {taskData: task},
      backdropClass: 'backdropBackground',
    });
  }

  driverDetailedInfo() {
    // this.dialog.open(DriverDetailedInfoComponent, {
    //   width: '800px',
    //   backdropClass: 'backdropBackground',
    // });
  }
}
