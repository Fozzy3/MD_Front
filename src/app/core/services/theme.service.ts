import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private apiUrl = 'URL_DEL_SERVICIO'; // Reemplaza con la URL de tu servicio

  constructor(private http: HttpClient) { }

  // getTheme(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getTheme(){
    return 'red';
  }
}
