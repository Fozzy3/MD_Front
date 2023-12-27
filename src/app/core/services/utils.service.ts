import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  private themeSource = new BehaviorSubject<string>('default-theme');
  currentTheme = this.themeSource.asObservable();

  formatDateToCustom(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade ceros a la izquierda si es necesario
    const formattedDate = `${year}${month}`;
    return formattedDate;
  }

  setTheme(theme: string) {
      this.themeSource.next(theme);
  }

}
