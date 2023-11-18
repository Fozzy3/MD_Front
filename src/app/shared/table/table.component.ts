import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() data: any = null;
  @Input() title: any = null;
  @Input() keys: any = null;
  @Input() headers: any = null;



  constructor(){}
  ngOnInit(){

  }

  isNumber(value: any): boolean {
    return !isNaN(value) && isFinite(value);
  }
}
