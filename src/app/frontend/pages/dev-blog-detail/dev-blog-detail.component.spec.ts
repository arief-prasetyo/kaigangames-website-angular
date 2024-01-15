import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBlogDetailComponent } from './dev-blog-detail.component';

describe('DevBlogDetailComponent', () => {
  let component: DevBlogDetailComponent;
  let fixture: ComponentFixture<DevBlogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevBlogDetailComponent]
    });
    fixture = TestBed.createComponent(DevBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
