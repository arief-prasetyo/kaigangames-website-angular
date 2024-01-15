import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeamImageComponent } from './about-team-image.component';

describe('AboutTeamImageComponent', () => {
  let component: AboutTeamImageComponent;
  let fixture: ComponentFixture<AboutTeamImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTeamImageComponent]
    });
    fixture = TestBed.createComponent(AboutTeamImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
