import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import {
  IonCol,
  IonRow,
  IonGrid,
  IonItem,
  IonIcon,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-country-contacts',
  templateUrl: './countryContacts.component.html',
  styleUrls: ['./countryContacts.component.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonImg,
    IonIcon,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class CountryContactsComponent {
  Env = environment;
  constructor() {}
}
