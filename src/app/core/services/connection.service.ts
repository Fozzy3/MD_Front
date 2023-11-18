import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviorment';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private apiUrl = 'URL_DEL_SERVICIO'; // Reemplaza con la URL de tu servicio

  constructor(private http: HttpClient) { }

  // getTheme(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getTheme(){
    return 'red';
  }

  logout():Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/auth/logout`)
  }


  getStamentBalanceByCategory(extractType: string,date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/balance/category?date=${date}&category=${extractType}`)
  }

  getStamentBalance(date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/balance?date=${date}`)
  }



}


