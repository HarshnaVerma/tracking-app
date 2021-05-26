import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoMatTableComponent } from './vehicle-info-mat-table.component';

describe('VehicleInfoMatTableComponent', () => {
  let component: VehicleInfoMatTableComponent;
  let fixture: ComponentFixture<VehicleInfoMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInfoMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
