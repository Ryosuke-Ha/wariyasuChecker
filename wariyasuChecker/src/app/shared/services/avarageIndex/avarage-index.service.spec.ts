import { TestBed } from '@angular/core/testing';

import { AvarageIndexService } from './avarage-index.service';

describe('AvarageIndexService', () => {
  let service: AvarageIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvarageIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
