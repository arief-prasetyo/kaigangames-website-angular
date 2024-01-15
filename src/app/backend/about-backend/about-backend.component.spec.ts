import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBackendComponent } from './about-backend.component';

describe('AboutBackendComponent', () => {
  let component: AboutBackendComponent;
  let fixture: ComponentFixture<AboutBackendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutBackendComponent]
    });
    fixture = TestBed.createComponent(AboutBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
