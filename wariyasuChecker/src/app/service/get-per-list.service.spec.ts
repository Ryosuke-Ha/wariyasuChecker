import { TestBed } from '@angular/core/testing';

import { GetPerListService } from './get-per-list.service';

describe('GetPerListService', () => {
  let service: GetPerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
