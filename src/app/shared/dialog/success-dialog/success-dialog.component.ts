import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public successMessage: string,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }
}
