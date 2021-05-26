import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDriverComponent } from './free-driver.component';

describe('FreeDriverComponent', () => {
  let component: FreeDriverComponent;
  let fixture: ComponentFixture<FreeDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
