import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only do this if the AuthService is synchronous or if you know the token is immediately available
    const token = this.authService.getToken(); // This is a hypothetical method that directly gets the token

    if (req.url.includes('/api/auth/login') || !token) {
      return next.handle(req);
    }
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}


export const authTokeninterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};
