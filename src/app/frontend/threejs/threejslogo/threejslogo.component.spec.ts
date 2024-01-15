import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejslogoComponent } from './threejslogo.component';

describe('ThreejslogoComponent', () => {
  let component: ThreejslogoComponent;
  let fixture: ComponentFixture<ThreejslogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejslogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreejslogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
