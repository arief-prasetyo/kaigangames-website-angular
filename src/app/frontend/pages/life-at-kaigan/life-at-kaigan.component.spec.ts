import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtKaiganComponent } from './life-at-kaigan.component';

describe('LifeAtKaiganComponent', () => {
  let component: LifeAtKaiganComponent;
  let fixture: ComponentFixture<LifeAtKaiganComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeAtKaiganComponent]
    });
    fixture = TestBed.createComponent(LifeAtKaiganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
