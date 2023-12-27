import { Component, OnInit  } from '@angular/core';
import { itemsAdmin } from '@core/data/userData'
import { SubTitleService } from '@core/observable/Observable-title.service';
import { AuthService } from '@core/services/auth.service';
import { ConnectionService } from '@core/services/connection.service';



@Component({
  selector: 'app-properties',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.scss']
})
export class MenuClientComponent {

  showChild: boolean = false;
  clientButtons: any;

  constructor(
    private informationText : SubTitleService,
    public auth: AuthService,
    private conService: ConnectionService

  ){}

  modules: any;
  ngOnInit(): void{

    this.conService.getModules().subscribe({
      next: (response) => {
        this.modules = response.data;
        this.clientButtons = this.filterActiveItems(this.modules, itemsAdmin)
      },
      error: (err) => console.error(err)
    });

    this.informationText.updateMenu({
      title: 'Menu Principal',
      subTitle: "Usuario",
      helpTitle: "Ayuda en menu principal",
      helpText: '<ol> <li><strong>Propiedades:</strong> Esta sección te permite visualizar, editar y administrar propiedades disponibles en el sistema.</li> <br> <li><strong>Cambiar contraseña:</strong> Si deseas actualizar o modificar tu contraseña, puedes hacerlo aquí de manera segura y sencilla.</li> <br> <li><strong>Contraseña usuario:</strong> Aquí tienes la posibilidad de gestionar las contraseñas de otros usuarios, lo que es útil en casos donde necesiten asistencia o restablecimiento.</li> <br> <li><strong>Subir Bases de Datos:</strong> Si necesitas actualizar o agregar información a granel, esta opción te permite cargar bases de datos de manera eficiente.</li> <br> <li><strong>Salida Segura:</strong> Te recomendamos usar esta opción para cerrar tu sesión de administrador de manera segura, garantizando la protección de tus datos y del sistema.</li> </ol>'});
    this.showChild = false
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  menuChange(item:any){
    this.informationText.updateMenu({
      title: item.title,
      subTitle: item.subTitle,
      helpTitle: item.helpTitle,
      helpText: item.helpText});
  }

  filterActiveItems(modules, itemsAdmin) {
    const activeKeys = new Set(modules.filter(module => module.state).map(module => module.key));
    return itemsAdmin.filter(item => (activeKeys.has(item.key) || item.key == 'out'));
  }
}

