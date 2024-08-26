import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-faq-hero',
  templateUrl: './faqHero.component.html',
  styleUrls: ['../../../../../app.component.scss', 'faqHero.component.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonCol, TranslateModule],
})
export class FaqHeroComponent {
  constructor() {}
}
