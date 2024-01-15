import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndonesiaTeamComponent } from './indonesia-team.component';

describe('IndonesiaTeamComponent', () => {
  let component: IndonesiaTeamComponent;
  let fixture: ComponentFixture<IndonesiaTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndonesiaTeamComponent]
    });
    fixture = TestBed.createComponent(IndonesiaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
