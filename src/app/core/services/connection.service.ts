import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/enviorment';
import {Response } from '@core/interfaces/configuration.interface'
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
  public params = new BehaviorSubject<any>(null); // Crea un BehaviorSubject para almacenar parámetros


  constructor(private http: HttpClient) { }


  getTheme(){
    return this.http.get(`${environment.API_URL}/api/config/theme`);
  }

  getParams() {
    return this.http.get(`${environment.API_URL}/api/config/params`);
}

  logout():Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/auth/logout`)
  }

  getBalance(date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/balance?date=${date}`)
  }

  getBalanceByCategory(extractType: string,date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/balance/category?date=${date}&category=${extractType}`)
  }

  getAuxiliary(date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/auxiliary?date=${date}`)
  }

  getAuxiliaryByCategory(auxType: string,date: string):Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/statements/auxiliary/category?date=${date}&category=${auxType}`)
  }

  getCreditLines():Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/lines`)
  }

  getPersonalData():Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/api/data`)
  }

  getCompanyData():Observable<Response> {
    return this.http.get<Response>(`${environment.API_URL}/api/data/contact`)
  }

  getModules():Observable<Response> {
    return this.http.get<Response>(`${environment.API_URL}/api/config/modules`)
  }

  patchModules(body: any):Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/api/config/modules`, body)
  }

  putFields(body: any):Observable<Response> {
    return this.http.put<Response>(`${environment.API_URL}/api/config/settings`, body)
  }

  getProperties():Observable<Response> {
    return this.http.get<Response>(`${environment.API_URL}/api/config/settings`)
  }







}


