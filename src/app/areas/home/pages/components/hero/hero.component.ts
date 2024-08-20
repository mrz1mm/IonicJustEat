import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonIcon,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['hero.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonHeader,
    TranslateModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonImg,
    IonIcon,
  ],
})
export class HeroComponent {
  constructor() {}
}
