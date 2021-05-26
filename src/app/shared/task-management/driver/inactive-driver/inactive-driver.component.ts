import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {DialogService} from '../../../services/dialog.service';
import {DriverInfo} from '../../../models/driver/driver-info';

@Component({
  selector: 'app-inactive-driver',
  templateUrl: './inactive-driver.component.html',
  styleUrls: ['./inactive-driver.component.scss']
})
export class InactiveDriverComponent implements OnInit, AfterContentChecked {

 // inActiveDriverList = [];
  @Input()inActiveDriverList: DriverInfo[];
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
