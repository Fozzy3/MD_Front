import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-load-formats',
  templateUrl: './load-formats.component.html',
  styleUrls: ['./load-formats.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoadFormatComponent {

  uploadedFiles: any[] = [];
  formatSelect: any;
  constructor(private fb: FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private http: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService
    ){}

    formatsList: any;


  ngOnInit(){
    this.getFormts();

    this.informationText.updateMenu({
      title: 'Subir Formato',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Subida de Archivos",
      helpText: "<p>Estás en la sección para subir archivos de control al sistema. Si necesitas guardar o actualizar algún documento, sigue las instrucciones a continuación:</p> <p><strong>Seleccione la Sucursal y el Archivo:</strong></p> <p>Antes de subir el archivo, verifica que has seleccionado la sucursal correcta. Luego, en la opción de 'Nombre entidad', confirma que estás gestionando los archivos bajo el perfil 'admin' o el nombre de entidad que corresponda.</p> <p><strong>Subir Archivo:</strong></p> <p>Para cargar los archivos al sistema:</p> <ol> <li>Haz clic en el botón <strong>'Subir'</strong>.</li> <li>Se abrirá una ventana de diálogo; selecciona el archivo que deseas subir desde tu dispositivo. Alternativamente, puedes arrastrar y soltar el archivo directamente sobre la casilla designada para ello.</li> <li>Una vez seleccionado el archivo, haz clic en la opción <strong>'Guardar destino como...'</strong> para finalizar la subida y almacenar el archivo en la ubicación deseada del sistema.</li> </ol> <p>Recuerda que es esencial subir solo archivos confiables y verificar la integridad de los mismos para asegurar un buen funcionamiento del sistema. En caso de dudas o problemas durante el proceso, consulta la documentación detallada o contacta al soporte técnico.</p>"})
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

  deleteFormat(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Esta seguro de eliminar dicho formato?',
        header: 'Eliminar Formato',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this.conService.deleteFormat(this.formatSelect).subscribe({
            next: (response) => {
              if(response.success == true){
                this.messageService.add({
                  severity: 'success',
                  summary: 'Formato eliminado exitosamente',
                  detail: 'Eliminado de la base de datos'
                });
                this.getFormts();
                this.deleteFormat = undefined;
              }else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error al eliminar el archivo',
                  detail: ''
                });
              }
            },
          });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Haz cancelado de eliminación' });
        }
    });
  }

  updateDatabase(){
    var formData = new FormData();
    Array.from(this.uploadedFiles).forEach(f => formData.append('file', f))
    this.conService.loadFormat(formData).subscribe({
      next: (response) => {
        if(response.success == true){
          this.messageService.add({
            severity: 'success',
            summary: 'Formato cargado exitosamente',
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

  downloadFormat() {
    this.conService.downloadFormat(this.formatSelect)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlArchivo = window.URL.createObjectURL(blob);
        const enlaceTemporal = document.createElement('a');
        enlaceTemporal.href = urlArchivo;
        enlaceTemporal.download = this.formatSelect;
        document.body.appendChild(enlaceTemporal);
        enlaceTemporal.click();
        document.body.removeChild(enlaceTemporal);
      }, (error) => {
        // Manejar errores de descarga
        console.error('Error al descargar el archivo:', error);
      });
  }



}
