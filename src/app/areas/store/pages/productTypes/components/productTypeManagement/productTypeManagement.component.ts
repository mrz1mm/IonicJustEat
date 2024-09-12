import { Component, computed } from '@angular/core';
import { ProductTypeService } from 'src/app/areas/store/services/productType.service';

@Component({
  selector: 'app-product-type-management',
  templateUrl: './productTypeManagement.component.html',
  styleUrls: ['./productTypeManagement.component.scss'],
  standalone: true,
  imports: [],
})
export class ProductTypeManagementComponent {
  allProductTypes = computed(() => this.productTypeSvc.allProductTypes());
  constructor(private productTypeSvc: ProductTypeService) {}
}
