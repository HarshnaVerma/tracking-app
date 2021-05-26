import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveDriverComponent } from './inactive-driver.component';

describe('InactiveDriverComponent', () => {
  let component: InactiveDriverComponent;
  let fixture: ComponentFixture<InactiveDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
