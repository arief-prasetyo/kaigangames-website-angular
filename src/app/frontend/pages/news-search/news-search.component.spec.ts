import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSearchComponent } from './news-search.component';

describe('NewsSearchComponent', () => {
  let component: NewsSearchComponent;
  let fixture: ComponentFixture<NewsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsSearchComponent]
    });
    fixture = TestBed.createComponent(NewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
