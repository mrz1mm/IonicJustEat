import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  standalone: true,
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    IonContent,
    TranslateModule,
    FooterComponent,
  ],
})
export class PrivacyPage {
  constructor() {}
}
