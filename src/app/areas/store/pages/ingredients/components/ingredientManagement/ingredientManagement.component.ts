import { Component, computed } from '@angular/core';
import { IngredientService } from 'src/app/areas/store/services/ingredient.service';

@Component({
  selector: 'app-ingredient-management',
  templateUrl: './ingredientManagement.component.html',
  styleUrls: ['./ingredientManagement.component.scss'],
  standalone: true,
  imports: [],
})
export class IngredientManagementComponent {
  allIngredients = computed(() => this.ingredientSvc.allIngredients());
  constructor(private ingredientSvc: IngredientService) {}
}
