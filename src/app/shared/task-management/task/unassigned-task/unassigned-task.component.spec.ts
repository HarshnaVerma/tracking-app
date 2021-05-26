import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedTaskComponent } from './unassigned-task.component';

describe('UnassignedTaskComponent', () => {
  let component: UnassignedTaskComponent;
  let fixture: ComponentFixture<UnassignedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
