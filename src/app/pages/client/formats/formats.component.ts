import { Component } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.scss']
})
export class FormatsComponent {

  formatSelect:any;
  formatsList: any[];
  constructor(
    private conService: ConnectionService
    ){}


  ngOnInit(){
    this.getFormts()

  }

  getFormts(){
    this.conService.getFormatsList().subscribe({
      next: (response) => {
        if(response.success == true){
           this.formatsList = response.data;
        }
      },
    });
  }

  downloadFormat(){
    this.conService.downloadFormat(this.formatSelect).subscribe({
      next: (response) => {
      },
    });
  }

}
