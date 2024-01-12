import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '@core/services/connection.service';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {

  sidebarVisible: boolean = false;
  showTile = true;
  information = {
    title: 'Modulo Web',
    subTitle: "Menu Usuario",
    helpTitle: "Administrador",
    helpText: "Hola, administrador, durante la vista actual usted podrá hacer las configuraciones básicas del modulo web, cambiar la bse de datos, y recuperar contraseña de sus usuarios."
  };
  contentSub: Subscription;

  constructor(
    private menuDataService : SubTitleService,
    private cdref: ChangeDetectorRef,
    protected router: Router,
    private conService: ConnectionService,
    protected utils: UtilsService
  ) {}

  ngOnInit(){
    this.contentSub = this.menuDataService.dataContent.subscribe(
      (content) => {
        if(content){
          this.information = content;
        }
        this.cdref.detectChanges();
      }
    )
    this.conService.getParams().subscribe({
      next: (response) => {
        this.conService.params.next(response['data']);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.contentSub){
      this.contentSub.unsubscribe();
    }
  }
}
