import { TestBed } from '@angular/core/testing';

import { BureauServiceService } from './bureau-service.service';

describe('BureauServiceService', () => {
  let service: BureauServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BureauServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
