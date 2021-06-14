import { TestBed } from '@angular/core/testing';

import { AverageIndexService } from './average-index.service';

describe('AvarageIndexService', () => {
  let service: AverageIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
