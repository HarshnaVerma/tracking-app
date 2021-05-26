import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {CustomizerService} from '../../../services/customizer.service';
import {DialogService} from '../../../services/dialog.service';
import {DriverInfo} from '../../../models/driver/driver-info';

@Component({
  selector: 'app-free-driver',
  templateUrl: './free-driver.component.html',
  styleUrls: ['./free-driver.component.scss']
})
export class FreeDriverComponent implements OnInit, AfterContentChecked {

  @Input()freeDriverList: DriverInfo[];
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
