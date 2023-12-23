import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { ThemeService } from '@core/services/theme.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.theme = this.themeService.getTheme();
  }
}
