import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,CanActivate,CanLoad,Route,Router,
} from '@angular/router';
import {catchError,map,Observable,Subject,takeUntil,tap,throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasRole(route);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }

  private destroy$ = new Subject<void>();

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];
    return this.authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.rol))),
      tap((hasRole) => {
        if (!hasRole) {
          this.authService.logout();
          this.router.navigateByUrl('/login'); // Redirige al usuario a la página de inicio de sesión si no tiene el rol adecuado.
        }
      }),
      catchError((error) => {
        console.error("Hubo un error al obtener el rol del usuario:", error);
        return throwError(error);
      }),
      takeUntil(this.destroy$)
    );
  }

  // Añade esto en el método ngOnDestroy de tu componente/servicio
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
