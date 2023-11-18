import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { SubTitleService } from '@core/observable/Observable-title.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent {
  loginData: FormGroup;
  hovered = false;

  constructor(
    protected autSvc :AuthService,
    private fb: FormBuilder,
    private informationText : SubTitleService){}

  ngOnInit(){
    this.loginData = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.informationText.updateMenu({
      title: 'Inicio de Sesión',
      subTitle: "",
      helpTitle: "Inicio de Sesión",
      helpText: "En la vista actual usted podrá acceder al modulo web con el usuario y contraseña dada por su administrador."});
  }
  onHover(isHovered: boolean) {
    this.hovered = isHovered;
  }

  private loginSubscription: Subscription | null = null;

  login(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    this.loginSubscription = this.autSvc.login(this.loginData.value).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('Login error:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
