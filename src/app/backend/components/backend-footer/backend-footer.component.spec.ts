import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendFooterComponent } from './backend-footer.component';

describe('BackendFooterComponent', () => {
  let component: BackendFooterComponent;
  let fixture: ComponentFixture<BackendFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendFooterComponent]
    });
    fixture = TestBed.createComponent(BackendFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
