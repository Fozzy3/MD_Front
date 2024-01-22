import { environment } from 'src/environments/enviorment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserResponse } from '@core/interfaces/user.interface';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { ConnectionService } from './connection.service';
import { MessageService } from 'primeng/api';

const USER_LOCAL_STORAGE_KEY = 'USER_LOCAL_STORAGE_KEY';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userSubject: BehaviorSubject<UserResponse | null> =
    new BehaviorSubject<UserResponse | null>(null);
  user$ = this._userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private conService: ConnectionService,
    private messageService: MessageService
  ) {
    const token = this.getToken();
    const userData = this.getUserFromLocalStorage();

    if (token && userData && typeof userData === 'object') {
      const userResponse: UserResponse = {
        ...(userData as UserResponse),
        token: token as string,
      };
      this._userSubject.next(userResponse);
    } else {
      this._userSubject.next(null);
    }
  }
  login(authData: User): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/api/auth/login`, authData)
      .pipe(
        tap((userToken) => this.saveTokenToLocalStore(userToken)),
        tap((userToken) => {
          this._userSubject.next(userToken['data']);
          this.redirectToMenu(userToken);
        }),
        catchError(this.handleError)
      );
  }

  private redirectToMenu(userToken): void {
    if (userToken && userToken['data'] && userToken['data'].rol) {
      this.router.navigateByUrl(`/${userToken['data'].rol}`);
    } else {
    }
  }


  logout(): void {
    if (localStorage.getItem(USER_LOCAL_STORAGE_KEY)) {
      this.conService.logout().subscribe({
        next: (response) => {
          if (response['success'] == true) {
            this.removeUserFromLocalStorage();
            this._userSubject.next(null);
            this.router.navigateByUrl('/login');
          } else {
            this.removeUserFromLocalStorage();
            this._userSubject.next(null);
          }
          window.location.reload();
        },
      });
    }
  }

  getToken(): string | null {
    const serializedInfo = JSON.parse(
      localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    );
    return serializedInfo ? serializedInfo['token'] : null;
  }

  private saveTokenToLocalStore(userToken: any): void {
    const serializedInfo = JSON.stringify(userToken['data']);
    if (
      serializedInfo != undefined &&
      serializedInfo != '' &&
      serializedInfo != null
    ) {
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, serializedInfo);
    }
  }

  public getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
  }

  removeUserFromLocalStorage(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  private handleError(err: any): Observable<never> {
    let error = 'An error happened during the login';
    console.error(error, err);
    return throwError(() => err);
  }
}
