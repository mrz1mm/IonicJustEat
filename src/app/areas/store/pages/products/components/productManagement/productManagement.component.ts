import { Component, computed } from '@angular/core';
import { ProductService } from 'src/app/areas/store/services/product.service';

@Component({
  selector: 'app-product-management-form',
  templateUrl: './productManagement.component.html',
  styleUrls: ['./productManagement.component.scss'],
  standalone: true,
  imports: [],
})
export class IngredientManagementComponent {
  allProducts = computed(() => this.productSvc.allProducts());
  constructor(private productSvc: ProductService) {}
}
