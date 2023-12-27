import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front_ModuloWeb' ;
  theme: string = 'blue';
  constructor(
    private messageService: MessageService,
    private conService: ConnectionService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    ) {
    }

  ngOnInit() {

    this.conService.getTheme().subscribe({
      next: (response) => {
        this.theme = (response['data']['theme'])
        this.renderer.setAttribute(this.document.documentElement, 'data-theme', this.theme);
      }
    });

  }
}
