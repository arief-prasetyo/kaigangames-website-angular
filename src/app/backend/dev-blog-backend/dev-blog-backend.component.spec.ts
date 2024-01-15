import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBlogBackendComponent } from './dev-blog-backend.component';

describe('DevBlogBackendComponent', () => {
  let component: DevBlogBackendComponent;
  let fixture: ComponentFixture<DevBlogBackendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevBlogBackendComponent]
    });
    fixture = TestBed.createComponent(DevBlogBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
