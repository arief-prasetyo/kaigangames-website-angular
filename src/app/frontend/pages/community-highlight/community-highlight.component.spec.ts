import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHighlightComponent } from './community-highlight.component';

describe('CommunityHighlightComponent', () => {
  let component: CommunityHighlightComponent;
  let fixture: ComponentFixture<CommunityHighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityHighlightComponent]
    });
    fixture = TestBed.createComponent(CommunityHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
