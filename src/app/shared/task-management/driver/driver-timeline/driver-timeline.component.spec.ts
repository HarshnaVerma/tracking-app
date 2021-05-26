import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTimelineComponent } from './driver-timeline.component';

describe('DriverTimelineComponent', () => {
  let component: DriverTimelineComponent;
  let fixture: ComponentFixture<DriverTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
