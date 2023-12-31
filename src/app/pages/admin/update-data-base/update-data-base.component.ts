import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTitleService } from '@core/observable/Observable-title.service';

@Component({
  selector: 'app-update-data-base',
  templateUrl: './update-data-base.component.html',
  styleUrls: ['./update-data-base.component.scss']
})
export class UpdateDataBaseComponent {

  databaseInfo: FormGroup;
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
    private informationText : SubTitleService
    ){}

  ngOnInit(){
    this.informationText.updateMenu({
      title: 'Cambiar Contraseña a Usuario',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Subida de Archivos",
      helpText: "<p>Estás en la sección para subir archivos de control al sistema. Si necesitas guardar o actualizar algún documento, sigue las instrucciones a continuación:</p> <p><strong>Seleccione la Sucursal y el Archivo:</strong></p> <p>Antes de subir el archivo, verifica que has seleccionado la sucursal correcta. Luego, en la opción de 'Nombre entidad', confirma que estás gestionando los archivos bajo el perfil 'admin' o el nombre de entidad que corresponda.</p> <p><strong>Subir Archivo:</strong></p> <p>Para cargar los archivos al sistema:</p> <ol> <li>Haz clic en el botón <strong>'Subir'</strong>.</li> <li>Se abrirá una ventana de diálogo; selecciona el archivo que deseas subir desde tu dispositivo. Alternativamente, puedes arrastrar y soltar el archivo directamente sobre la casilla designada para ello.</li> <li>Una vez seleccionado el archivo, haz clic en la opción <strong>'Guardar destino como...'</strong> para finalizar la subida y almacenar el archivo en la ubicación deseada del sistema.</li> </ol> <p>Recuerda que es esencial subir solo archivos confiables y verificar la integridad de los mismos para asegurar un buen funcionamiento del sistema. En caso de dudas o problemas durante el proceso, consulta la documentación detallada o contacta al soporte técnico.</p>"})

    this.databaseInfo = this.fb.group({
      branch: ['', Validators.required]
    })
  }

  onUpload(event) {
    this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onSubmit(){
  }

}
