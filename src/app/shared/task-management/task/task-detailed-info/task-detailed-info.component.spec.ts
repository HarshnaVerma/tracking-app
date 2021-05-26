import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailedInfoComponent } from './task-detailed-info.component';

describe('TaskDetailedInfoComponent', () => {
  let component: TaskDetailedInfoComponent;
  let fixture: ComponentFixture<TaskDetailedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
