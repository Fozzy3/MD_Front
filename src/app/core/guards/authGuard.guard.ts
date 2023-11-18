import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    if (token) {
      // If there is a token, return true to allow the route to activate
      return true;
    } else {
      // If there is no token, return false, or redirect to a login route
      // You could redirect the user to a login page or return an UrlTree
      // For example: return this.router.parseUrl('/login');
      return false;
    }
  }
}
