import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerOPComponent } from './career-op.component';

describe('CareerOPComponent', () => {
  let component: CareerOPComponent;
  let fixture: ComponentFixture<CareerOPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerOPComponent]
    });
    fixture = TestBed.createComponent(CareerOPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
