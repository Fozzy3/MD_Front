//Angular
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { ErrorInterceptor } from '@core/interceptors/error-interceptor.service';

// PrimeNg
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import {TableModule} from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { StepsModule } from 'primeng/steps';
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';



//Shared Link
import { LoginBoxComponent } from './pages/login/login-box/login-box.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

// Admin Links
import { ConsoleAdminComponent } from './pages/admin/console-admin/console-admin.component';
import { PasswordChangeComponent } from './pages/admin/password-change/password-change.component';
import { PasswordUserComponent } from './pages/admin/password-user/password-user.component';
import { PropertiesComponent } from './pages/admin/properties/properties.component';
import { UpdateDataBaseComponent } from './pages/admin/update-data-base/update-data-base.component';

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
import { authTokeninterceptorProvider } from '@core/interceptors/auth-token.interceptor';
import { TableComponent } from './shared/table/table.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginBoxComponent,
    NotFoundComponent,
    ConsoleAdminComponent,
    PropertiesComponent,
    PasswordChangeComponent,
    PasswordUserComponent,
    UpdateDataBaseComponent,
    LineasCreditoComponent,
    MenuClientComponent,
    AuxiliariesComponent,
    ChangeUserPasswordComponent,
    ComplementDataComponent,
    ContactEntityComponent,
    CreditApplicationComponent,
    LineasCreditoComponent,
    CreditSimulatorComponent,
    ExtractBalanceComponent,
    ExtractsComponent,
    FormatsComponent,
    MenuClientComponent,
    StateApplicationComponent,
    TableComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    RadioButtonModule,
    FileUploadModule,
    TableModule,
    FileSaverModule,
    PasswordModule,
    StepsModule,
    SidebarModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    OverlayPanelModule
  ],
  providers: [authTokeninterceptorProvider, MessageService, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,   multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
