import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-account-preferences',
  templateUrl: './accountPreferences.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'accountPreferences.component.scss',
  ],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    TranslateModule,
  ],
})
export class AccountPreferencesComponent {
  constructor() {}
}
