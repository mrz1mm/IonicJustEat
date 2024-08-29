import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['../../../../../app.component.scss', 'payments.component.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    TranslateModule,
  ],
})
export class PaymentsComponent {
  constructor() {}
}
