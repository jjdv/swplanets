import { TestBed } from '@angular/core/testing';

import { GalaxyMapHighlightService } from './galaxy-map.service';

describe('DetailedMapHighlight', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalaxyMapHighlightService = TestBed.get(GalaxyMapHighlightService);
    expect(service).toBeTruthy();
  });
});
