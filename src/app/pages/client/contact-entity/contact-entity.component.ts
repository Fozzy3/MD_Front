import { Component } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { Response } from '@core/interfaces/configuration.interface';

@Component({
  selector: 'app-contact-entity',
  templateUrl: './contact-entity.component.html',
  styleUrls: ['./contact-entity.component.scss']
})
export class ContactEntityComponent {


  data: any;

  constructor(
    private conService: ConnectionService
  ){}

  ngOnInit() {
    this.conService.getCompanyData().subscribe({
      next: (response) => {
        this.data = response.data;
      },
      error: (err) => console.error(err)
    });
  }
}

