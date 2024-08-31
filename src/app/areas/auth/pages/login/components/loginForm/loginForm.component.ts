import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../../../../services/authService.service';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, fingerPrint } from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';

@Component({
  selector: 'app-login-form',
  standalone: true,
  styleUrls: [
    '../../../../../../app.component.scss',
    './loginForm.component.scss',
  ],
  imports: [
    IonText,
    IonButton,
    IonInput,
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
export class LoginFormComponent implements OnInit {
  Path = Path;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'finger-print': fingerPrint,
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[A-Za-z\d\S]{6,}$/
          ),
        ],
      ],
    });
  }

  getHelperText(controlName: string): string {
    const control = this.loginForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.loginForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `LoginForm.${controlName.toUpperCase()}_REQUIRED`;
    }
    if (control.errors['email']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }
    if (control.errors['pattern']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }

    return null;
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authSvc.login(loginRequest);
    }
  }
}
