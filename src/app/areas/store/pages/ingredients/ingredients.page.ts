import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { IngredientManagementComponent } from './components/ingredientManagement/ingredientManagement.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
  standalone: true,
  imports: [IonContent, IngredientManagementComponent, FooterComponent],
})
export class IngredientsPage {
  constructor() {}
}
