import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipProgramSliderComponent } from './internship-program-slider.component';

describe('InternshipProgramSliderComponent', () => {
  let component: InternshipProgramSliderComponent;
  let fixture: ComponentFixture<InternshipProgramSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipProgramSliderComponent]
    });
    fixture = TestBed.createComponent(InternshipProgramSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
