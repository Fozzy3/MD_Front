import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UtilsService } from '@core/services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('mySvg', { static: false }) mySvg: ElementRef;
  title = 'front_ModuloWeb' ;
  theme: string = 'blue';
  constructor(
    private messageService: MessageService,
    private conService: ConnectionService,
    private utils: UtilsService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    ) {
    }

  ngOnInit() {
    this.conService.getTheme().subscribe({
      next: (response) => {
        this.theme = (response['data']['theme'])
        this.utils.setName(response['data']['nameBusiness'])
        this.utils.setTheme(this.theme);
        this.renderer.setAttribute(this.document.documentElement, 'data-theme', this.theme);
      }
    });
  }



}
