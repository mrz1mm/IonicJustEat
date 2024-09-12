import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StoreFormComponent } from './components/storeForm/storeForm.component';
import { FooterComponent } from '../../../../layout/footer/footer.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  standalone: true,
  imports: [IonContent, StoreFormComponent, FooterComponent],
})
export class StorePage {
  constructor() {}
}
