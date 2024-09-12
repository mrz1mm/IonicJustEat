import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StoreFormComponent } from '../shared/storeForm/storeForm.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: true,
  imports: [IonContent, StoreFormComponent],
})
export class StorePage {
  constructor() {}
}
