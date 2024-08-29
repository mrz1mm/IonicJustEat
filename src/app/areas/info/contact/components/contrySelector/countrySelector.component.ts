import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-country-selector',
  templateUrl: './countrySelector.component.html',
  styleUrls: ['./countrySelector.component.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class CountrySelectorComponent {
  constructor() {}
}
