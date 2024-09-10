import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-unverified-email',
  templateUrl: './unverifiedEmail.component.html',
  styleUrls: ['./unverifiedEmail.component.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonLabel,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonButton,
    IonContent,
  ],
})
export class UnverifiedEmailComponent {
  constructor() {
    addIcons({});
  }
}
