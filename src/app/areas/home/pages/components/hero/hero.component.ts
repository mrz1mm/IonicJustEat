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
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['../../../../../app.component.scss', 'hero.component.scss'],
  standalone: true,
  imports: [
    IonInput,
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
