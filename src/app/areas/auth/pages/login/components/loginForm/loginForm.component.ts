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
import { AuthService } from '../../../../services/AuthService.service';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonFab,
  IonTitle,
  IonInput,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, chevronForward, fingerPrint } from 'ionicons/icons';

@Component({
  selector: 'app-login-form',
  standalone: true,
  styleUrls: ['./loginForm.component.scss'],
  imports: [
    IonText,
    IonInput,
    IonTitle,
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
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    addIcons({
      'person-outline': personOutline,
      'finger-print': fingerPrint,
      'chevron-forward': chevronForward,
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authSvc.login(loginRequest);
    }
  }
}
