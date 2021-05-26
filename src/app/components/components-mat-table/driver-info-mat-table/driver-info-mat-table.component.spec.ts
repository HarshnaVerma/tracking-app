import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoMatTableComponent } from './driver-info-mat-table.component';

describe('DriverInfoMatTableComponent', () => {
  let component: DriverInfoMatTableComponent;
  let fixture: ComponentFixture<DriverInfoMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInfoMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
