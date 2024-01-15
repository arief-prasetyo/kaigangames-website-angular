import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLifeAtKaiganComponent } from './career-life-at-kaigan.component';

describe('CareerLifeAtKaiganComponent', () => {
  let component: CareerLifeAtKaiganComponent;
  let fixture: ComponentFixture<CareerLifeAtKaiganComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerLifeAtKaiganComponent]
    });
    fixture = TestBed.createComponent(CareerLifeAtKaiganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
