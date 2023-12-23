import { Component } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';

@Component({
  selector: 'app-complement-data',
  templateUrl: './complement-data.component.html',
  styleUrls: ['./complement-data.component.scss']
})
export class ComplementDataComponent {

  constructor(    private conService: ConnectionService    ){

  }

  data:any;

  ngOnInit(){
    this.conService.getPersonalData().subscribe({
      next: (response) => {
        this.data = this.processResponseData(response['data']);
        },
    });
  }

  private processResponseData(data: any): any {
    for (const key in data) {
      if (data[key] === null || data[key] === '') {
        data[key] = 'No proporcionado';
      }
    }
    return data;
  }


}
