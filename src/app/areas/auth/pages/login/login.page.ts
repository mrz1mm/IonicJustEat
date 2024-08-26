import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../layout/header/header.component';
import { IonContent } from '@ionic/angular/standalone';
import { LoginFormComponent } from './components/loginForm/loginForm.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../../../../app.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    LoginFormComponent,
  ],
})
export class LoginPage {
  constructor() {}
}
