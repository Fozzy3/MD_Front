import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginBoxComponent } from './pages/login/login-box/login-box.component';
import { ConsoleAdminComponent } from './pages/admin/console-admin/console-admin.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { UpdateDataBaseComponent } from './pages/admin/update-data-base/update-data-base.component';
import { PasswordUserComponent } from './pages/admin/password-user/password-user.component';
import { PasswordChangeComponent } from './pages/admin/password-change/password-change.component';

// Client Link
import { AuxiliariesComponent } from './pages/client/auxiliaries/auxiliaries.component';
import { ChangeUserPasswordComponent } from './pages/client/change-user-password/change-user-password.component';
import { ComplementDataComponent } from './pages/client//complement-data/complement-data.component';
import { ContactEntityComponent } from './pages/client/contact-entity/contact-entity.component';
import { CreditApplicationComponent } from './pages/client/credit-application/credit-application.component';
import { LineasCreditoComponent } from './pages/client/credit-lines/credit-lines.component';
import { CreditSimulatorComponent } from './pages/client/credit-simulator/credit-simulator.component';
import { ExtractBalanceComponent } from './pages/client/extract-balance/extract-balance.component';
import { ExtractsComponent } from './pages/client/extracts/extracts.component';
import { FormatsComponent } from './pages/client/formats/formats.component';
import { MenuClientComponent } from './pages/client/menu-client/menu-client.component';
import { StateApplicationComponent } from './pages/client//state-application/state-application.component';
import { HasRoleGuard } from '@core/guards/has-role.guard';
import { UpdateLicenseComponent } from './pages/admin/update-license/update-license.component';
import { LoadFormatComponent } from './pages/admin/load-formats/load-formats.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login', component: LoginBoxComponent
  },
  {
    path:'client', component: MenuClientComponent,
    canActivate: [HasRoleGuard],
    data: { allowedRoles: ['client', 'client'] },
    children: [
      {
        path: '',
        component: MenuClientComponent
      },
      {
        path: 'lineas-credito',
        component: LineasCreditoComponent
      },
      {
        path: 'simulador-credito',
        component: CreditSimulatorComponent
      },
      {
        path: 'extracto-saldos',
        component: ExtractBalanceComponent
      },
      {
        path: 'auxiliares',
        component: AuxiliariesComponent
      },
      {
        path: 'extractos',
        component: ExtractsComponent
      },
      {
        path: 'solicitud-credito',
        component: CreditApplicationComponent
      },
      {
        path: 'estado-solicitud',
        component: StateApplicationComponent
      },
      {
        path: 'complementar-datos',
        component: ComplementDataComponent
      },
      {
        path: 'cambiar-contraseña',
        component: ChangeUserPasswordComponent
      },
      {
        path: 'contacte-entidad',
        component: ContactEntityComponent
      },
      {
        path: 'formatos',
        component: FormatsComponent
      },
      {
        path: 'salida-segura',
        component: MenuClientComponent
      },
    ]
  },
  {
    path:'admin', component: ConsoleAdminComponent,
    canActivate: [HasRoleGuard],
    data: { allowedRoles: ['admin', 'admin'] },
    canLoad: [HasRoleGuard],
    children: [
      {
        path: '',
        component: ConsoleAdminComponent
      },
      {
        path: 'propiedades',
        component: PropertiesComponent
      },
      {
        path: 'cambio-contrasena',
        component: PasswordChangeComponent
      },
      {
        path: 'contrasena-usuario',
        component: PasswordUserComponent
      },
      {
        path: 'subir-base-datos',
        component: UpdateDataBaseComponent
      },
      {
        path: 'actualizar-licencia',
        component: UpdateLicenseComponent
      },
      {
        path: 'subir-formatos',
        component: LoadFormatComponent
      },
      {
        path: 'salida-segura',
        component: ConsoleAdminComponent
      }
    ]
  },
  {
    path:'**', component: NotFoundComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
