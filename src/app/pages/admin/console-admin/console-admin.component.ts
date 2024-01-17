import { Component, OnInit  } from '@angular/core';
import { itemsAdmin } from '@core/data/adminData'
import { AuthService } from './../../../core/services/auth.service';
import { SubTitleService } from '@core/observable/Observable-title.service';

@Component({
  selector: 'app-console-admin',
  templateUrl: './console-admin.component.html',
  styleUrls: ['./console-admin.component.scss']
})
export class ConsoleAdminComponent implements OnInit {

  constructor( public auth: AuthService,
    private informationText : SubTitleService){}

  showChild: boolean = false;
  adminButtons: any;
  ngOnInit(): void{
    this.informationText.updateMenu({
      title: 'Menú Principal',
      subTitle: "Usuario",
      helpTitle: "Ayuda en menu principal",
      helpText: '<ol> <li><strong>Propiedades:</strong> Esta sección te permite visualizar, editar y administrar propiedades disponibles en el sistema.</li> <br> <li><strong>Cambiar contraseña:</strong> Si deseas actualizar o modificar tu contraseña, puedes hacerlo aquí de manera segura y sencilla.</li> <br> <li><strong>Contraseña usuario:</strong> Aquí tienes la posibilidad de gestionar las contraseñas de otros usuarios, lo que es útil en casos donde necesiten asistencia o restablecimiento.</li> <br> <li><strong>Subir Bases de Datos:</strong> Si necesitas actualizar o agregar información a granel, esta opción te permite cargar bases de datos de manera eficiente.</li> <br> <li><strong>Salida Segura:</strong> Te recomendamos usar esta opción para cerrar tu sesión de administrador de manera segura, garantizando la protección de tus datos y del sistema.</li> </ol>'});
    this.adminButtons = itemsAdmin
    this.showChild = false
    this.adminButtons = itemsAdmin
    this.showChild = false
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

}
