import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwGalaxyMapComponent } from './sw-galaxy-map.component';

describe('SwGalaxyMapComponent', () => {
  let component: SwGalaxyMapComponent;
  let fixture: ComponentFixture<SwGalaxyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwGalaxyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwGalaxyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
