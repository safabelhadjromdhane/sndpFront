import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { desactivetGuard } from './desactivet.guard';

describe('desactivetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => desactivetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
