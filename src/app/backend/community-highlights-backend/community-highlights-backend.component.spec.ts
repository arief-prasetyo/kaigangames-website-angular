import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHighlightsBackendComponent } from './community-highlights-backend.component';

describe('CommunityHighlightsBackendComponent', () => {
  let component: CommunityHighlightsBackendComponent;
  let fixture: ComponentFixture<CommunityHighlightsBackendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityHighlightsBackendComponent]
    });
    fixture = TestBed.createComponent(CommunityHighlightsBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
