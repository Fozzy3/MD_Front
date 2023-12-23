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
    // Intercepta la solicitud y devuelve un Observable de HttpEvent<any>
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body && !('success' in event.body && event.body.success === true)) {
              // Muestra el mensaje basado en el cuerpo de la respuesta si no es exitosa
              this.showMessageBasedOnResponse(event.body);
            }
          }
          return event;
        }),
      catchError((err) => {
        this.handleHttpError(err);
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

