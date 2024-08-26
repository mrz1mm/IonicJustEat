import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgotPasswordForm.component.html',
  styleUrls: ['./forgotPasswordForm.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class ForgotPasswordFormComponent {
  constructor() {}
}
