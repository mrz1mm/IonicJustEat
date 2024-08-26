import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRequest } from '../../../../interfaces/LoginRequest';
import { AuthService } from '../../../../services/AuthService.service';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonFab,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  personOutline,
  chevronForward,
} from 'ionicons/icons';

@Component({
  selector: 'app-login-form',
  standalone: true,
  styleUrls: ['./loginForm.component.scss'],
  imports: [
    IonFab,
    IonIcon,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './loginForm.component.html',
})
export class LoginFormComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
    ],
  });

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'lock-closed-outline': lockClosedOutline,
      'chevron-forward': chevronForward,
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authSvc.login(loginRequest);
    }
  }
}
