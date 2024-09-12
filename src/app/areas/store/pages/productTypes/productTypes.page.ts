import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { ProductTypeManagementComponent } from './components/productTypeManagement/productTypeManagement.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';

@Component({
  selector: 'app-product-types',
  templateUrl: './productTypes.page.html',
  styleUrls: ['./productTypes.page.scss'],
  standalone: true,
  imports: [IonContent, ProductTypeManagementComponent, FooterComponent],
})
export class ProductTypesPage {
  constructor() {}
}
