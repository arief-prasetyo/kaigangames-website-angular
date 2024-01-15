import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFeaturedJobsComponent } from './career-featured-jobs.component';

describe('CareerFeaturedJobsComponent', () => {
  let component: CareerFeaturedJobsComponent;
  let fixture: ComponentFixture<CareerFeaturedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerFeaturedJobsComponent]
    });
    fixture = TestBed.createComponent(CareerFeaturedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
