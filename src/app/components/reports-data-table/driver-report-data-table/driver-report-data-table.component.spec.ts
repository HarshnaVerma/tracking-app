import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverReportDataTableComponent } from './driver-report-data-table.component';

describe('DriverReportDataTableComponent', () => {
  let component: DriverReportDataTableComponent;
  let fixture: ComponentFixture<DriverReportDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverReportDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverReportDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
