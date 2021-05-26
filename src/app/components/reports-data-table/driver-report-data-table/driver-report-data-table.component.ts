import {AfterViewInit, Component, EventEmitter, Input,
  OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-driver-report-data-table',
  templateUrl: './driver-report-data-table.component.html',
  styleUrls: ['./driver-report-data-table.component.scss']
})
export class DriverReportDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @Input()tableData: any = [];
  @Output() refreshTableData = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      pagingType: 'full_numbers',
      scroller: true,
      scrollCollapse: true,
      scrollX: true,
      responsive: true,
      select: true,
      // dom: '<\'row\'<\'col-sm-12 col-md-3\'l><\'col-sm-12 col-md-3\'B><\'col-sm-12 col-md-6\'f>>' +
      //   '<\'row\'<\'col-sm-12\'tr>>' +
      //   '<\'row\'<\'col-sm-12 col-md-3 entries\'i><\'col-sm-12 col-md-9 entries\'p>>',
      // buttons: [
      //   {
      //     extend: 'csv',
      //     title: 'Relation'
      //   },
      //   {
      //     extend: 'excel',
      //     title: 'Relation'
      //   }
      // ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
