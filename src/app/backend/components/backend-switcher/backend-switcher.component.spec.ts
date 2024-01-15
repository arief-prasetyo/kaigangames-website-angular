import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendSwitcherComponent } from './backend-switcher.component';

describe('BackendSwitcherComponent', () => {
  let component: BackendSwitcherComponent;
  let fixture: ComponentFixture<BackendSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendSwitcherComponent]
    });
    fixture = TestBed.createComponent(BackendSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
