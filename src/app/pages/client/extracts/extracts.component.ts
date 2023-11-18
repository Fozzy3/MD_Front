import { Component } from '@angular/core';

@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.scss']
})
export class ExtractsComponent {

  step: any = 0;
  ngOnInit(){

  }
  nextStep(){
    this.step++;

  }

  beforeStep(){
    this.step--;
  }



}
