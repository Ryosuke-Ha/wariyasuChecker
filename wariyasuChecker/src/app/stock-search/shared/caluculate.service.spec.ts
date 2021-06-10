import { TestBed } from '@angular/core/testing';

import { CaluculateService } from './caluculate.service';

describe('CaluculateService', () => {
  let service: CaluculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaluculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
