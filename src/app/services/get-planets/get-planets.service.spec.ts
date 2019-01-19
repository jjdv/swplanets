import { TestBed } from '@angular/core/testing';

import { GetPlanetsService } from './get-planets.service';

describe('GetPlanetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPlanetsService = TestBed.get(GetPlanetsService);
    expect(service).toBeTruthy();
  });
});
