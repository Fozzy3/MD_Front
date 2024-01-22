import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { ConnectionService } from '@core/services/connection.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  propertiesForm: FormGroup;
  modules:any;
  colorSelect: any = null;
  modulesAct: any

  backgroundColors: any[] = [
    "blue",
    "green",
    "pink",
    "orange",
    "red",
  ]

  constructor(
    private formBuilder: FormBuilder,
    private informationText : SubTitleService,
    private conService: ConnectionService,
    private messageService: MessageService,
    private router: Router
    ) {
    this.propertiesForm = this.formBuilder.group({
      branches: ['', Validators.required],
      nameBusiness: ['', Validators.required],
      nitBusiness: ['', Validators.required],
      theme: ['', Validators.required],
      whatsapp: ['', Validators.required],
      pageTitle: [''],
      pageComment: [''],


    });
  }

  ngOnInit() {

    this.conService.getProperties().subscribe({
      next: (response) => {
        this.modules = response.data['modules']
        this.modulesAct = response.data['modules'].reduce((acc, module) => {
          acc[module.key] = module.state;
          return acc;
        }, {});
        this.propertiesForm.setValue(response.data['fields']);
      },
      error: (err) => console.error(err)
    });

    this.updateMenu();
  }

  updateMenu(){
    this.informationText.updateMenu({
      title: 'Propiedades',
      subTitle: "Administrador",
      helpTitle: "Guía Rápida: Vista de Propiedades y Módulos",
      helpText: '<p>La presente vista te proporciona un acceso centralizado a información clave y módulos de tu entidad. A continuación, una breve descripción:</p> <p><strong>Propiedades de la Entidad:</strong></p> <p>Esta sección te muestra los detalles específicos de tu entidad y sucursal. Desde el número de sucursales hasta la ruta donde se almacenan los archivos, te brinda un panorama general de la estructura de tu organización y dónde encontrar información relevante. En específico, puedes visualizar el nombre, NIT, y otros datos de la entidad y sucursal a la que perteneces.</p> <p><strong>Activación de Módulos:</strong></p> <p>Esta parte te permite interactuar con diferentes módulos para la gestión y operación. Algunas de las funcionalidades incluyen:</p> <ul> <li><strong>Créditos:</strong> Gestión y visualización de créditos otorgados o solicitados.</li> <li><strong>Tablas de Amortización:</strong> Detalles de los pagos y plazos de créditos.</li> <li><strong>Estado de Solicitud:</strong> Revisa el estado de tus solicitudes en tiempo real.</li> <li><strong>Contacte su Entidad:</strong> Un canal directo para comunicarte con la entidad.</li> <li><strong>Saldos:</strong> Consulta y gestión de saldos disponibles o adeudados.</li> <li>... y muchos otros módulos diseñados para facilitar tu experiencia y gestión dentro de la entidad.</li> </ul> <p>Recuerda siempre navegar con precaución y en caso de dudas o inquietudes, no dudes en consultar el manual detallado o contactar a soporte técnico.</p>'})
  }

  onSubmit() {
    const transformedArray = Object.entries(this.modulesAct).map(([key, value]) => {
      return { category: key, state: value };
    });

    this.conService.putFields(this.propertiesForm.value).subscribe({
      next: (response) => {
        if(response.success === true){
          this.conService.patchModules(transformedArray).subscribe({
            next: (response) => {
              if(response.success === true){
                this.messageService.add({
                  severity: 'success',
                  summary: 'Actualizo Correctamente',
                  detail: 'Módulos guardados correctamente'
                });
                this.router.navigateByUrl(`/admin`);
              }else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error al actualizar la configuración'
                });
              }
            },
            error: (err) => console.error(err)
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar los módulos'
          });
        }
      },
      error: (err) => console.error(err)
    });
  }

}

