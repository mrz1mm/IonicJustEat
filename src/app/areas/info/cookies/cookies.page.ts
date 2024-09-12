import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.page.html',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    TranslateModule,
    FooterComponent,
  ],
})
export class CookiesPage {
  constructor() {}
}
