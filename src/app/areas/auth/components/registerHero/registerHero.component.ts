import { Component, Input } from '@angular/core';
import { AuthPage } from '../../pages/auth.page';

@Component({
  selector: 'app-register-hero',
  standalone: true,
  imports: [],
  templateUrl: './registerHero.component.html',
})
export class RegisterHeroComponent {
  constructor(private authPage: AuthPage) {}

  showRegisterForm() {
    this.authPage.rightPanelActive.set(true);
  }
}
