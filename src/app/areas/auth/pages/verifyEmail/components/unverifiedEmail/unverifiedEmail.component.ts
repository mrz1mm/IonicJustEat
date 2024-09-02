import { Component } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-unverified-email',
  templateUrl: './unverifiedEmail.component.html',
  styleUrls: ['./unverifiedEmail.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent],
})
export class UnverifiedEmailComponent {
  constructor() {
    addIcons({
      'checkmark-circle': checkmarkCircle,
    });
  }
}
