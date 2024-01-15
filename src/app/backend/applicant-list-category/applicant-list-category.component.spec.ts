import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantListCategoryComponent } from './applicant-list-category.component';

describe('ApplicantListCategoryComponent', () => {
  let component: ApplicantListCategoryComponent;
  let fixture: ComponentFixture<ApplicantListCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantListCategoryComponent]
    });
    fixture = TestBed.createComponent(ApplicantListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
