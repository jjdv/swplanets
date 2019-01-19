import { TestBed } from '@angular/core/testing';

import { DetailedMapService } from './detailed-map.service';

describe('DetailedMapHighlight', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailedMapService = TestBed.get(DetailedMapService);
    expect(service).toBeTruthy();
  });
});
