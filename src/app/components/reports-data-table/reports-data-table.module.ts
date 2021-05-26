import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsDataTableRoutingModule } from './reports-data-table-routing.module';
import { DriverReportDataTableComponent } from './driver-report-data-table/driver-report-data-table.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    DriverReportDataTableComponent
  ],
  exports: [
    DriverReportDataTableComponent
  ],
  imports: [
    CommonModule,
    ReportsDataTableRoutingModule,
    DataTablesModule
  ]
})
export class ReportsDataTableModule { }
