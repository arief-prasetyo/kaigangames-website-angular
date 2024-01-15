import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetOurFoundersComponent } from './meet-our-founders.component';

describe('MeetOurFoundersComponent', () => {
  let component: MeetOurFoundersComponent;
  let fixture: ComponentFixture<MeetOurFoundersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetOurFoundersComponent]
    });
    fixture = TestBed.createComponent(MeetOurFoundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
