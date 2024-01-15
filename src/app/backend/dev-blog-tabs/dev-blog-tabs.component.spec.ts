import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBlogTabsComponent } from './dev-blog-tabs.component';

describe('DevBlogTabsComponent', () => {
  let component: DevBlogTabsComponent;
  let fixture: ComponentFixture<DevBlogTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevBlogTabsComponent]
    });
    fixture = TestBed.createComponent(DevBlogTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
