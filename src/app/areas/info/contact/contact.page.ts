import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { ContactHeroComponent } from './components/contactHero/contactHero.component';
import { CountrySelectorComponent } from './components/contrySelector/countrySelector.component';
import { CountryContactsComponent } from './components/countryContacts/countryContacts.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  standalone: true,
  imports: [
    IonContent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    ContactHeroComponent,
    CountrySelectorComponent,
    CountryContactsComponent,
  ],
})
export class ContactPage {
  constructor() {}
}
