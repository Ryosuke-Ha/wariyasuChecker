import { TestBed } from '@angular/core/testing';

import { LatestValueService } from './latest-value.service';

describe('LatestValueService', () => {
  let service: LatestValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
