import { CanActivateFn } from '@angular/router';

export const desactivetGuard: CanActivateFn = (route, state) => {
  return true;
};
