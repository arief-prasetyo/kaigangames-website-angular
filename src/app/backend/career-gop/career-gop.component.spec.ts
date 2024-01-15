import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerGOPComponent } from './career-gop.component';

describe('CareerGOPComponent', () => {
  let component: CareerGOPComponent;
  let fixture: ComponentFixture<CareerGOPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerGOPComponent]
    });
    fixture = TestBed.createComponent(CareerGOPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
