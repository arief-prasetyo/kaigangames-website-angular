import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicantListComponent } from './aplicant-list.component';

describe('AplicantListComponent', () => {
  let component: AplicantListComponent;
  let fixture: ComponentFixture<AplicantListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AplicantListComponent]
    });
    fixture = TestBed.createComponent(AplicantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
