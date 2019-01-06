import { TestBed } from '@angular/core/testing';

import { PlanetLocationService } from './planet-location.service';

describe('PlanetLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetLocationService = TestBed.get(PlanetLocationService);
    expect(service).toBeTruthy();
  });
});
