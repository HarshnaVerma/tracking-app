import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDriverInfoComponent } from './task-driver-info.component';

describe('TaskDriverInfoComponent', () => {
  let component: TaskDriverInfoComponent;
  let fixture: ComponentFixture<TaskDriverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDriverInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDriverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
