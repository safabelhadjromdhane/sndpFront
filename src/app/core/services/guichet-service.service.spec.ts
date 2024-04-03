import { TestBed } from '@angular/core/testing';

import { GuichetServiceService } from './guichet-service.service';

describe('GuichetServiceService', () => {
  let service: GuichetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuichetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
