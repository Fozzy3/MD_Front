import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-data-base',
  templateUrl: './update-data-base.component.html',
  styleUrls: ['./update-data-base.component.scss']
})
export class UpdateDataBaseComponent {

  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private messageService: MessageService,
    private http: HttpClient
    ){}

  ngOnInit(){
    this.informationText.updateMenu({
      title: 'Restablecer Contraseña a Usuario',
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
      summary: 'Archivo cargado',
      detail: ''
    });
  }

  imprimir(){
    console.log(this.uploadedFiles)
  }

  file: any;
  onFileChange(event: any): void {
    this.file = (event.target as HTMLInputElement).files?.[0];
    // Puedes realizar acciones con el archivo aquí (por ejemplo, mostrar el nombre)
    console.log('Nombre del archivo:', this.file?.name);
  }


  updateDatabase(){
    console.log(this.uploadedFiles[0])
    const formData = new FormData();
    formData.append('file', this.file);

    // this.conService.basicUploadSingle(this.file).subscribe({
    //   next: (response) => {
    //     console.log(response)
    //   },
    // });
  }

  // ----------------------

  percentDone: number;
  uploadSuccess: boolean;

  upload(files: File[]){
    this.basicUpload(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.conService.updateDatabase(formData).subscribe({
      next: (response) => {
        console.log(response)
      },
    });

    // this.http.post('http://localhost:8090/api/files/upload/', formData)
    //   .subscribe(event => {
    //     console.log('done')
    //   })
  }

}
