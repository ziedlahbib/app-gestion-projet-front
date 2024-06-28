import { TestBed } from '@angular/core/testing';

import { StatitstiqueService } from './statitstique.service';

describe('StatitstiqueService', () => {
  let service: StatitstiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatitstiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
