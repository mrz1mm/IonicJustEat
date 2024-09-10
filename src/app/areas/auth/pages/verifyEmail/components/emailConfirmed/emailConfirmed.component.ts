import { RouterModule } from '@angular/router';
import { Path } from './../../../../../../library/utils/Path';
import { Component } from '@angular/core';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './emailConfirmed.component.html',
  styleUrls: ['./emailConfirmed.component.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
    IonButton,
    IonContent,
    RouterModule,
  ],
})
export class EmailConfirmedComponent {
  Path = Path;
  constructor() {
    addIcons({ checkmarkCircle });
  }
}
