import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../services/authService.service';
import { RegisterRequest } from '../../../../interfaces/RegisterRequest';
import { Role } from 'src/app/library/utils/Role';
import { IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register-form',
  standalone: true,
  styleUrls: ['./registerForm.component.scss'],
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './registerForm.component.html',
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  roles = Object.values(Role);

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      role: ['', Validators.required],
    });
  }

  matchPassword(passwordKey: string) {
    return (control: AbstractControl) => {
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
    }
  }
}
