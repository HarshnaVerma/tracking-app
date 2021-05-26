import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssignmentListComponent } from './driver-assignment-list.component';

describe('DriverAssignmentListComponent', () => {
  let component: DriverAssignmentListComponent;
  let fixture: ComponentFixture<DriverAssignmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAssignmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
