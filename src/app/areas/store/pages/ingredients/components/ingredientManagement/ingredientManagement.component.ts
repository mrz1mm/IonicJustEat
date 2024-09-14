import { Component, computed } from '@angular/core';
import { IngredientService } from 'src/app/areas/store/services/ingredient.service';
import { IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ingredient-management',
  templateUrl: './ingredientManagement.component.html',
  styleUrls: ['./ingredientManagement.component.scss'],
  standalone: true,
  imports: [IonItem, IonList],
})
export class IngredientManagementComponent {
  allIngredients = computed(() => this.ingredientSvc.allIngredients());
  constructor(private ingredientSvc: IngredientService) {
    this.ingredientSvc.getAllIngredients();
  }
}
