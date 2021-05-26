import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailedInfoComponent } from './driver-detailed-info.component';

describe('DriverDetailedInfoComponent', () => {
  let component: DriverDetailedInfoComponent;
  let fixture: ComponentFixture<DriverDetailedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
