import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-restaurants-offers',
  templateUrl: './restaurantsOffers.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'restaurantsOffers.component.scss',
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
export class RestaurantsOffersComponent {
  constructor() {}
}
