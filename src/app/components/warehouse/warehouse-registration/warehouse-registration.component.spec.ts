import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRegistrationComponent } from './warehouse-registration.component';

describe('WarehouseRegistrationComponent', () => {
  let component: WarehouseRegistrationComponent;
  let fixture: ComponentFixture<WarehouseRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
