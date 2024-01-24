import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsOnMobileComponent } from './three-js-on-mobile.component';

describe('ThreeJsOnMobileComponent', () => {
  let component: ThreeJsOnMobileComponent;
  let fixture: ComponentFixture<ThreeJsOnMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeJsOnMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeJsOnMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
