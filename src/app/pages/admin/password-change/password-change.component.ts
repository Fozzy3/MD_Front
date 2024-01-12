import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})

export class PasswordChangeComponent {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private router: Router,
    private messageService: MessageService
    ){}


  ngOnInit(){
    this.changePasswordForm = this.fb.group({
    username: ['admin', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

    this.informationText.updateMenu({
      title: 'Cambiar Contraseña',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Cambio de Contraseña",
      helpText: "<p>Estás en la sección de <strong>Cambio de Contraseña</strong> dentro del <strong>Menú Principal</strong>. Esta área es crucial para mantener la seguridad de tu cuenta. A continuación, te brindamos una breve descripción de lo que puedes encontrar y hacer aquí:</p> <p><strong>Usuario y Propiedades:</strong></p> <p>Antes de realizar cambios, es importante que verifiques que estás gestionando la cuenta correcta. Puedes confirmar esto a través de los detalles proporcionados:</p> <ul> <li><strong>Nombre de entidad:</strong> Identifica el usuario con el cual estás registrado en el sistema. En este caso, parece que estás registrado como 'admin'.</li> <li><strong>Nit entidad:</strong> Por seguridad, esta información se muestra parcialmente oculta.</li> <li><strong>Nombre Sucursal y Nombre Carpeta:</strong> Aunque estos detalles están ocultos, sirven para proporcionar una capa adicional de confirmación sobre la cuenta que estás gestionando.</li> </ul> <p>Una vez confirmados estos datos, puedes proceder con seguridad a cambiar tu contraseña. Recuerda elegir una contraseña robusta, combinando letras, números y símbolos, y evitando palabras comunes o fechas. Además, es recomendable cambiarla regularmente para proteger tu cuenta.</p> <p>Si encuentras cualquier anomalía o tienes dudas durante el proceso, te recomendamos ponerte en contacto con el soporte técnico o revisar la documentación detallada.</p>"});
  }

  onSubmit(){
    this.conService.putPasswordAdmin(this.changePasswordForm.value).subscribe({
      next: (response) => {
        if(response.success == true){
          this.messageService.add({
            severity: 'success',
            summary: 'Credenciales actualizadas',
            detail: response['message']
          });
        }
        this.router.navigateByUrl(`/admin`);
      },
    });
  }

}
