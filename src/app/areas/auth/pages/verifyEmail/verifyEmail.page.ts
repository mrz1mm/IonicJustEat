import { AuthService } from 'src/app/areas/auth/services/authService.service';
import { Component, computed } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { EmailConfirmedComponent } from './components/emailConfirmed/emailConfirmed.component';
import { UnverifiedEmailComponent } from './components/unverifiedEmail/unverifiedEmail.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verifyEmail.page.html',
  standalone: true,
  imports: [IonContent, EmailConfirmedComponent, UnverifiedEmailComponent],
})
export class VerifyEmailPage {
  isEmailConfirmed = computed<boolean | null>(() =>
    this.AuthSvc.isEmailConfirmed()
  );

  constructor(private AuthSvc: AuthService) {}
}
