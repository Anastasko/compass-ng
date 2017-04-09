import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsMenuComponent } from './buildings-menu.component';

describe('BuildingsMenuComponent', () => {
  let component: BuildingsMenuComponent;
  let fixture: ComponentFixture<BuildingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
