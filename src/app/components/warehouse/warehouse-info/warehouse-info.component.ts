import { Component, OnInit } from '@angular/core';
import {WarehouseRegistrationComponent} from '../warehouse-registration/warehouse-registration.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-warehouse-info',
  templateUrl: './warehouse-info.component.html',
  styleUrls: ['./warehouse-info.component.scss']
})
export class WarehouseInfoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addWarehouse() {
    const dialogRef = this.dialog.open(WarehouseRegistrationComponent, {
      width: '1000px',
      // height: '600px',
      //    panelClass: 'custom-modalbox',
      backdropClass: 'backdropBackground',
      //  disableClose: true
    });
  }
}
