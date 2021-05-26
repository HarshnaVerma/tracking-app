import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoMatTableComponent } from './order-info-mat-table.component';

describe('OrderInfoMatTableComponent', () => {
  let component: OrderInfoMatTableComponent;
  let fixture: ComponentFixture<OrderInfoMatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoMatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
