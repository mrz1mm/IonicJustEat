import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LoginFormComponent } from './components/loginForm/loginForm.component';
import { LoginHeroComponent } from './components/loginHero/loginHero.component';
import { RegisterFormComponent } from './components/registerForm/registerForm.component';
import { RegisterHeroComponent } from './components/registerHero/registerHero.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  standalone: true,
  imports: [
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
