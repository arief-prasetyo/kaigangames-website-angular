import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBlogComponent } from './dev-blog.component';

describe('DevBlogComponent', () => {
  let component: DevBlogComponent;
  let fixture: ComponentFixture<DevBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevBlogComponent]
    });
    fixture = TestBed.createComponent(DevBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
