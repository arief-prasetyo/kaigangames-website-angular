import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobVacancyDetailComponent } from './job-vacancy-detail.component';

describe('JobVacancyDetailComponent', () => {
  let component: JobVacancyDetailComponent;
  let fixture: ComponentFixture<JobVacancyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobVacancyDetailComponent]
    });
    fixture = TestBed.createComponent(JobVacancyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
