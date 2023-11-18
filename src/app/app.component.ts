import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front_ModuloWeb' ;
  theme: string = '';


  constructor(
    private themeService: ThemeService,
    ) { }

  // ngOnInit() {
  //   this.themeService.getTheme().subscribe(data => {

  //     this.theme = data.theme; // Asigna el valor del tema recibido desde el servicio
  //   });
  ngOnInit() {
    this.theme = this.themeService.getTheme();
    console.log(this.theme)

  }
}
