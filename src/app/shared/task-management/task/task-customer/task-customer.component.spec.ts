import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCustomerComponent } from './task-customer.component';

describe('TaskCustomerComponent', () => {
  let component: TaskCustomerComponent;
  let fixture: ComponentFixture<TaskCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
