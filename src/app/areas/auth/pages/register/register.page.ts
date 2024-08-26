import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { RegisterFormComponent } from './components/registerForm/registerForm.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../../../../app.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    RegisterFormComponent,
  ],
})
export class RegisterPage {
  constructor() {}
}
