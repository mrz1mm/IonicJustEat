import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LoginFormComponent } from './components/loginForm/loginForm.component';
import { LoginHeroComponent } from './components/loginHero/loginHero.component';
import { RegisterFormComponent } from './components/registerForm/registerForm.component';
import { RegisterHeroComponent } from './components/registerHero/registerHero.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    LoginFormComponent,
    LoginHeroComponent,
    RegisterFormComponent,
    RegisterHeroComponent,
  ],
})
export class AuthPage {
  rightPanelActive = signal(false);
}
