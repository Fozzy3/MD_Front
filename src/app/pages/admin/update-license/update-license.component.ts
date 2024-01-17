import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.scss']
})
export class UpdateLicenseComponent {

  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router
    ){}

  ngOnInit(){
    this.informationText.updateMenu({
      title: 'Restablecer Licencia del aplicativo',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Subida de Archivos",
      helpText: "<p>Estás en la sección para subir archivos de control al sistema. Si necesitas guardar o actualizar algún documento, sigue las instrucciones a continuación:</p> <p><strong>Seleccione la Sucursal y el Archivo:</strong></p> <p>Antes de subir el archivo, verifica que has seleccionado la sucursal correcta. Luego, en la opción de 'Nombre entidad', confirma que estás gestionando los archivos bajo el perfil 'admin' o el nombre de entidad que corresponda.</p> <p><strong>Subir Archivo:</strong></p> <p>Para cargar los archivos al sistema:</p> <ol> <li>Haz clic en el botón <strong>'Subir'</strong>.</li> <li>Se abrirá una ventana de diálogo; selecciona el archivo que deseas subir desde tu dispositivo. Alternativamente, puedes arrastrar y soltar el archivo directamente sobre la casilla designada para ello.</li> <li>Una vez seleccionado el archivo, haz clic en la opción <strong>'Guardar destino como...'</strong> para finalizar la subida y almacenar el archivo en la ubicación deseada del sistema.</li> </ol> <p>Recuerda que es esencial subir solo archivos confiables y verificar la integridad de los mismos para asegurar un buen funcionamiento del sistema. En caso de dudas o problemas durante el proceso, consulta la documentación detallada o contacta al soporte técnico.</p>"})
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'Archivo listo para subir',
      detail: ''
    });
  }

  updateDatabase(){
    var formData = new FormData();
    Array.from(this.uploadedFiles).forEach(f => formData.append('file', f))
    this.conService.updateLicense(formData).subscribe({
      next: (response) => {
        if(response.success == true){
          this.messageService.add({
            severity: 'success',
            summary: 'Licencia enviado exitosamente',
            detail: 'Cargado a la base de datos'
          });
          this.router.navigateByUrl(`/admin`);
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error al subir archivo',
            detail: ''
          });
          this.router.navigateByUrl(`/admin`);
        }
      },
    });
  }



}
