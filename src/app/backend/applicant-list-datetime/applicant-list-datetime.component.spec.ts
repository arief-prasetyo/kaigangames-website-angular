import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantListDatetimeComponent } from './applicant-list-datetime.component';

describe('ApplicantListDatetimeComponent', () => {
  let component: ApplicantListDatetimeComponent;
  let fixture: ComponentFixture<ApplicantListDatetimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantListDatetimeComponent]
    });
    fixture = TestBed.createComponent(ApplicantListDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
