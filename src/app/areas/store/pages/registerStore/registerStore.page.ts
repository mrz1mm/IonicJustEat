import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StoreFormComponent } from './components/storeForm/storeForm.component';

@Component({
  selector: 'app-register-store',
  templateUrl: './registerStore.page.html',
  styleUrls: ['./registerStore.page.scss'],
  standalone: true,
  imports: [IonContent, StoreFormComponent],
})
export class RegisterStorePage {
  constructor() {}
}
