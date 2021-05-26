import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverToTaskComponent } from './assign-driver-to-task.component';

describe('AssignDriverToTaskComponent', () => {
  let component: AssignDriverToTaskComponent;
  let fixture: ComponentFixture<AssignDriverToTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriverToTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverToTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
