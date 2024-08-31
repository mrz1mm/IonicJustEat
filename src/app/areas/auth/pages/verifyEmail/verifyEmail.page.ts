import { AuthService } from 'src/app/areas/auth/services/authService.service';
import { Component, computed, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { EmailConfirmedComponent } from './components/emailConfirmed/emailConfirmed.component';
import { UnverifiedEmailComponent } from './components/unverifiedEmail/unverifiedEmail.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmEmailRequest } from '../../interfaces/ConfirmEmailRequest';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verifyEmail.page.html',
  standalone: true,
  imports: [IonContent, EmailConfirmedComponent, UnverifiedEmailComponent],
})
export class VerifyEmailPage implements OnInit {
  isEmailConfirmed = computed<boolean | null>(() =>
    this.AuthSvc.isEmailConfirmed()
  );

  constructor(private AuthSvc: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const token = params['token'];
      if (id && token) {
        const model: ConfirmEmailRequest = {
          id: id,
          token: token,
        };
        this.AuthSvc.confirmEmail(model);
      }
    });
  }
}
