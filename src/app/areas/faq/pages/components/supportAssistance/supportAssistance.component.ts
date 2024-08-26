import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-support-assistance',
  templateUrl: './supportAssistance.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'supportAssistance.component.scss',
  ],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonAccordionGroup,
    IonLabel,
    IonItem,
    IonAccordion,
    TranslateModule,
  ],
})
export class SupportAssistanceComponent {
  constructor() {}
}
