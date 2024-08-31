import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown } from 'ionicons/icons';

@Component({
  selector: 'app-country-selector',
  templateUrl: './countrySelector.component.html',
  styleUrls: ['./countrySelector.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class CountrySelectorComponent {
  constructor() {
    addIcons({
      'arrow-down': arrowDown,
    });
  }
}
