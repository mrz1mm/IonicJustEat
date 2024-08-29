import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { ContactHeroComponent } from './aboutUsHero/contactHero.component';
import { JustEatDescriptionComponent } from './justEatDescription/justEatDescription.component';
import { JustEatTakeawayDescriptionComponent } from './justEatTakeawayDescription/justEatTakeawayDescription.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './aboutUs.page.html',
  standalone: true,
  imports: [
    IonContent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    ContactHeroComponent,
    JustEatDescriptionComponent,
    JustEatTakeawayDescriptionComponent,
  ],
})
export class AboutUsPage {
  constructor() {}
}
