import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(`Request is on it's way ${req.url}`);
  const authToken = localStorage.getItem('acess_token')
  const authReq = req.clone({
    setHeaders :{ Authorization : `Bearer ${authToken}`}
  })
  return next(authReq);
};
