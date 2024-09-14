import { Path } from './../../../../../../library/utils/Path';
import { Component, computed } from '@angular/core';
import { ProductService } from 'src/app/areas/store/services/product.service';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { ProductFormComponent } from '../productForm/productForm.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './productManagement.component.html',
  styleUrls: ['./productManagement.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    RouterModule,
    FooterComponent,
    ProductFormComponent,
  ],
})
export class IngredientManagementComponent {
  Path = Path;
  allProducts = computed(() => this.productSvc.allProducts());
  constructor(private productSvc: ProductService) {}
}
