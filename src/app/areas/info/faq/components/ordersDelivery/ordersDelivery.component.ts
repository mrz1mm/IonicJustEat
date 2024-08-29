import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonLabel,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-orders-delivery',
  templateUrl: './ordersDelivery.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'ordersDelivery.component.scss',
  ],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    TranslateModule,
  ],
})
export class OrdersDeliveryComponent {
  constructor() {}
}
