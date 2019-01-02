import { TestBed } from '@angular/core/testing';

import { PlanetDetailsService } from './planet-details.service';

describe('PlanetDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetDetailsService = TestBed.get(PlanetDetailsService);
    expect(service).toBeTruthy();
  });
});
