import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseInfoMatTableComponent } from './warehouse-info-mat-table.component';

describe('WarehouseInfoMatTableComponent', () => {
  let component: WarehouseInfoMatTableComponent;
  let fixture: ComponentFixture<WarehouseInfoMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseInfoMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseInfoMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
