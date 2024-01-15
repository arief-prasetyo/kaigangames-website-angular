import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFaqsComponent } from './game-faqs.component';

describe('GameFaqsComponent', () => {
  let component: GameFaqsComponent;
  let fixture: ComponentFixture<GameFaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameFaqsComponent]
    });
    fixture = TestBed.createComponent(GameFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
