import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonText,
  IonButton,
  IonItem,
  IonInput,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/areas/auth/services/auth.service';
import { PasswordRecoveryRequest } from 'src/app/areas/auth/interfaces/PasswordRecoveryRequest.interface';
import { Path } from 'src/app/library/utils/Path';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgotPasswordForm.component.html',
  styleUrls: ['./forgotPasswordForm.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonButton,
    IonText,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ForgotPasswordFormComponent implements OnInit {
  Path = Path;
  forgotPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    addIcons({
      'person-outline': personOutline,
    });
  }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getHelperText(controlName: string): string {
    const control = this.forgotPasswordForm.get(controlName);
    return control?.touched && control?.valid
      ? `ForgotPasswordForm.${controlName.toUpperCase()}_VALID`
      : `ForgotPasswordForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.forgotPasswordForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `ForgotPasswordForm.${controlName.toUpperCase()}_REQUIRED`;
    }
    if (control.errors['email']) {
      return `ForgotPasswordForm.${controlName.toUpperCase()}_FORMAT`;
    }

    return null;
  }

  passwordRecovery(): void {
    if (this.forgotPasswordForm.valid) {
      const passwordRecoveryRequest: PasswordRecoveryRequest =
        this.forgotPasswordForm.value;
      this.authSvc.passwordRecovery(passwordRecoveryRequest);
    }
  }
}
