import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { ForgotPasswordFormComponent } from './components/forgotPasswordForm/forgotPasswordForm.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotPassword.page.html',
  standalone: true,
  imports: [IonContent, FooterComponent, ForgotPasswordFormComponent],
})
export class ForgotPasswordPage {
  constructor() {}
}
