import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyDriverComponent } from './busy-driver.component';

describe('BusyDriverComponent', () => {
  let component: BusyDriverComponent;
  let fixture: ComponentFixture<BusyDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
