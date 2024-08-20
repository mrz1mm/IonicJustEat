import { Component } from '@angular/core';
import { AuthPage } from '../../pages/auth.page';

@Component({
  selector: 'app-login-hero',
  standalone: true,
  imports: [],
  templateUrl: './loginHero.component.html',
})
export class LoginHeroComponent {
  constructor(private authPage: AuthPage) {}

  showLoginForm() {
    this.authPage.rightPanelActive.set(false);
  }
}
