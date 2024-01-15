import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerBenefitPerksComponent } from './career-benefit-perks.component';

describe('CareerBenefitPerksComponent', () => {
  let component: CareerBenefitPerksComponent;
  let fixture: ComponentFixture<CareerBenefitPerksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerBenefitPerksComponent]
    });
    fixture = TestBed.createComponent(CareerBenefitPerksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
