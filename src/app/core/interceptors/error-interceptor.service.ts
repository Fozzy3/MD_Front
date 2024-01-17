import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private messageService: MessageService
    ) { }

  // To do - translate to english comments and functions
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const contentType = event.headers.get('content-type');
          if (contentType && contentType.toLowerCase().includes('application/pdf')) {
          }
        }
        return event;
      }),
      catchError((err) => {
        // You can add error handling logic here if needed
        return throwError(() => err);
      })
    );
  }

  private showMessageBasedOnResponse(body: any) {
    // Solo muestra el mensaje si no es un mensaje de éxito
    if (!('success' in body && body.success === true)) {
      const message = body.message || 'Error inesperado';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
  }

  private handleHttpError(err: HttpErrorResponse) {
    // Solo muestra el mensaje de error si aún no se ha manejado
    if (!(err && err.error && err.error.handled)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Red',
        detail: 'Ha ocurrido un error inesperado'
      });
    }
  }

  deleteLocal() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}

