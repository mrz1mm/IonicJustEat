import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { IngredientManagementComponent } from './components/productManagement/productManagement.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonContent, IngredientManagementComponent, FooterComponent],
})
export class ProductsPage {
  constructor() {}
}
