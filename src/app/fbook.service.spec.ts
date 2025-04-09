import { TestBed } from '@angular/core/testing';

import { FbookService } from './fbook.service';

describe('FbookService', () => {
  let service: FbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
