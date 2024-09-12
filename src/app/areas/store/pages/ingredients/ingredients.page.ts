import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class IngredientsPage {
  constructor() {}
}
