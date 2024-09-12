import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-types',
  templateUrl: './productTypes.page.html',
  styleUrls: ['./productTypes.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class ProductTypesPage {
  constructor() {}
}
