import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register-store',
  templateUrl: './registerStore.page.html',
  styleUrls: ['./registerStore.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class RegisterStorePage {
  constructor() {}
}
