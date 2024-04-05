import { CanActivateFn, ActivatedRouteSnapshot,RouterStateSnapshot,Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean=> {

  return true;
};
