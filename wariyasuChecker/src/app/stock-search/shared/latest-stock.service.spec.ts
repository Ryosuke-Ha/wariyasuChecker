import { TestBed } from '@angular/core/testing';

import { LatestStockService } from './latest-stock.service';

describe('LatestStockService', () => {
  let service: LatestStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
