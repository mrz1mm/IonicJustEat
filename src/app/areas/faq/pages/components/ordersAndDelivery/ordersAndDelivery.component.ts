import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {} from '@ionic/angular/standalone';

@Component({
  selector: 'app-orders-and-delivery',
  templateUrl: './ordersAndDelivery.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'ordersAndDelivery.component.scss',
  ],
  standalone: true,
  imports: [TranslateModule],
})
export class OrdersAndDeliveryComponent {
  constructor() {}
}
