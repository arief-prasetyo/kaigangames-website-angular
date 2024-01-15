import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressBackendComponent } from './press-backend.component';

describe('PressBackendComponent', () => {
  let component: PressBackendComponent;
  let fixture: ComponentFixture<PressBackendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressBackendComponent]
    });
    fixture = TestBed.createComponent(PressBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
