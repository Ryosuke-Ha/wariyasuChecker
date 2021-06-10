import { TestBed } from '@angular/core/testing';

import { UsCompanyService } from './us-company.service';

describe('UsCompanyService', () => {
  let service: UsCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
