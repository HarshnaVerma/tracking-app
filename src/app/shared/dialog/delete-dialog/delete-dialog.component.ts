import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BackendApiService} from '../../services/backendapi.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  urlDelete: string;
  @Input()type: any;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private backendApiService: BackendApiService) {
  }

  ngOnInit() {
    this.urlDelete = this.data.urlDelete;
  }

  clickYes() {
    // this.backendApiService.callToApi(this.urlDelete).subscribe(res => {
    //   if (res.status === false) {
    //     alert('File Deleted UnSuccessfully');
    //   }
    //   this.dialogRef.close();
    // });


  }

}
