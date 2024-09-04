import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';
import { RegisterRequest } from '../../../../interfaces/RegisterRequest.interface';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonInput,
  IonIcon,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { call, fingerPrint, home, personOutline } from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';

@Component({
  selector: 'app-register-form',
  standalone: true,
  styleUrls: ['./registerForm.component.scss'],
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
  templateUrl: './registerForm.component.html',
})
export class RegisterFormComponent implements OnInit {
  Path = Path;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'finger-print': fingerPrint,
      home: home,
      call: call,
    });
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
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
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cap: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  getHelperText(controlName: string): string {
    const control = this.registerForm.get(controlName);
    return control?.touched && control?.valid
      ? `RegisterForm.${controlName.toUpperCase()}_VALID`
      : `RegisterForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.registerForm.get(controlName);

    if (control?.touched && control?.errors) {
      if (control.errors['required']) {
        return `RegisterForm.${controlName.toUpperCase()}_REQUIRED`;
      }
      if (control.errors['email']) {
        return `RegisterForm.${controlName.toUpperCase()}_FORMAT`;
      }
      if (control.errors['pattern']) {
        return `RegisterForm.${controlName.toUpperCase()}_FORMAT`;
      }
      if (controlName === 'confirmPassword' && control.errors['match']) {
        return `RegisterForm.PASSWORD_MATCH`;
      }
    }

    return null;
  }

  matchPassword(passwordKey: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (formGroup) {
        const password = formGroup.get(passwordKey);
        if (password && control.value !== password.value) {
          return { match: true };
        }
      }
      return null;
    };
  }

  register(): void {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = this.registerForm.value;
      this.authSvc.register(registerRequest);
      console.log('Registering', registerRequest);
    }
  }
}
