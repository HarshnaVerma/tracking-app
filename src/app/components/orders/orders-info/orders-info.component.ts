import { Component, OnInit } from '@angular/core';
import {OrderCreationComponent} from '../order-creation/order-creation.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss']
})
export class OrdersInfoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addOrder() {
    const dialogRef = this.dialog.open(OrderCreationComponent, {
      width: '1000px',
      // height: '600px',
      //    panelClass: 'custom-modalbox',
      backdropClass: 'backdropBackground',
      //  disableClose: true
    });
  }
}
