import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-unverified-email',
  templateUrl: './unverifiedEmail.component.html',
  standalone: true,
  imports: [IonContent],
})
export class UnverifiedEmailComponent {
  constructor() {}
}
