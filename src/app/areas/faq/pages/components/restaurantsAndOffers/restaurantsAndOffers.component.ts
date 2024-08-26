import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {} from '@ionic/angular/standalone';

@Component({
  selector: 'app-restaurants-and-offers',
  templateUrl: './restaurantsAndOffers.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'restaurantsAndOffers.component.scss',
  ],
  standalone: true,
  imports: [TranslateModule],
})
export class RestaurantsAndOffersComponent {
  constructor() {}
}
