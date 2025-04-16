import { TestBed } from '@angular/core/testing';

import { GdataService } from './gdata.service';

describe('GdataService', () => {
  let service: GdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
