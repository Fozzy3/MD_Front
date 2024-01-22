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

  downloadFormat() {
    this.conService.downloadFormat(this.formatSelect)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlArchivo = window.URL.createObjectURL(blob);
        const enlaceTemporal = document.createElement('a');
        enlaceTemporal.href = urlArchivo;
        enlaceTemporal.download = this.formatSelect; // Puedes establecer un nombre de archivo adecuado
        document.body.appendChild(enlaceTemporal);
        enlaceTemporal.click();
        document.body.removeChild(enlaceTemporal);
      }, (error) => {
        // Manejar errores de descarga
        console.error('Error al descargar el archivo:', error);
      });
  }

}
