import { TestBed } from '@angular/core/testing';

import { GetresService } from './getres.service';

describe('GetresService', () => {
  let service: GetresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
