import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendNavigationsComponent } from './backend-navigations.component';

describe('BackendNavigationsComponent', () => {
  let component: BackendNavigationsComponent;
  let fixture: ComponentFixture<BackendNavigationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackendNavigationsComponent]
    });
    fixture = TestBed.createComponent(BackendNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
