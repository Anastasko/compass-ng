import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMapComponent } from './landing-map.component';

describe('LandingMapComponent', () => {
  let component: LandingMapComponent;
  let fixture: ComponentFixture<LandingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
