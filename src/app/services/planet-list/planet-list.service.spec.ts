import { TestBed } from '@angular/core/testing';

import { PlanetListService } from './planet-list.service';

describe('PlanetListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetListService = TestBed.get(PlanetListService);
    expect(service).toBeTruthy();
  });
});
