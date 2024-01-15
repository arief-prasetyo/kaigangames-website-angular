import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHighlightsSectionComponent } from './community-highlights-section.component';

describe('CommunityHighlightsSectionComponent', () => {
  let component: CommunityHighlightsSectionComponent;
  let fixture: ComponentFixture<CommunityHighlightsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityHighlightsSectionComponent]
    });
    fixture = TestBed.createComponent(CommunityHighlightsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
