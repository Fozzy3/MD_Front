import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-password-user',
  templateUrl: './password-user.component.html',
  styleUrls: ['./password-user.component.scss']
})
export class PasswordUserComponent {

  passwordUser: FormGroup;

  constructor(
    private fb : FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private messageService: MessageService,
    private router: Router
    ){
      this.passwordUser = this.fb.group({
        identification: ['', Validators.required]})
    }

  ngOnInit(){
    this.informationText.updateMenu({
      title: 'Restablecer Contraseña a Usuario',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Cambio de Contraseña de Usuario",
      helpText: "<p>Estás en la sección donde, como administrador, tienes la capacidad de cambiar la contraseña de un usuario específico. Este proceso es esencial para asistir a usuarios que puedan haber olvidado sus credenciales o requieran un restablecimiento por razones de seguridad. A continuación, te ofrecemos una breve guía:</p> <p><strong>Ingrese Identificación del Usuario:</strong></p> <p>Para iniciar el proceso, es crucial identificar al usuario de manera precisa. Ingresa la identificación del usuario en el campo provisto. Asegúrate de que la información sea exacta para evitar alteraciones en cuentas equivocadas.</p> <p><strong>Nombre de entidad:</strong></p> <p>Este campo te permite confirmar o especificar la entidad a la cual pertenece el usuario. Esto es especialmente útil si administras múltiples entidades o divisiones.</p> <p>Una vez ingresada la información requerida, podrás proceder con el cambio de contraseña. Te sugerimos informar al usuario afectado sobre este cambio para que esté al tanto y pueda acceder sin inconvenientes. Es vital que el usuario cambie esta contraseña temporal por una de su elección tan pronto como sea posible para mantener la integridad de su cuenta.</p> <p>Si encuentras problemas o tienes inquietudes, no dudes en consultar la documentación detallada o ponerte en contacto con soporte técnico.</p>"});


  }

  onSubmit(){
    console.log(this.passwordUser.get('identification').value)
    this.conService.putRestorePasswordClient(this.passwordUser.get('identification').value).subscribe({
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
    });  }
}
