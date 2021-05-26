import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {DialogService} from '../../../services/dialog.service';
import {DriverInfo} from '../../../models/driver/driver-info';

@Component({
  selector: 'app-busy-driver',
  templateUrl: './busy-driver.component.html',
  styleUrls: ['./busy-driver.component.scss']
})
export class BusyDriverComponent implements OnInit, AfterContentChecked {

  // busyDriverList = [];
  @Input()busyDriverList: DriverInfo[];
  toolTipText = 'Remaining Tasks: 0';
  loadPage: boolean;
  @Input()searchValueText: string;
  constructor(public customizerService: CustomizerService, public dialogService: DialogService) { }

  ngOnInit(): void {
  }


  ngAfterContentChecked(): void {
    this.loadPage = true;
  }
}
