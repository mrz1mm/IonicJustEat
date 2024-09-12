import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CategoryFormComponent } from './components/categoryForm/categoryForm.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  standalone: true,
  imports: [IonContent, CategoryFormComponent, FooterComponent],
})
export class CategoriesPage {
  constructor() {}
}
