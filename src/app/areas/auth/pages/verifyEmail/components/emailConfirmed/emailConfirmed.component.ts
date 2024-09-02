import { Component } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './emailConfirmed.component.html',
  styleUrls: ['./emailConfirmed.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonContent],
})
export class EmailConfirmedComponent {
  constructor() {
    addIcons({
      'checkmark-circle': checkmarkCircle,
    });
  }
}
