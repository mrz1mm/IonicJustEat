import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { IStoreWithDistance } from 'src/app/library/maps/interfaces/iStoreWithDistance.interface';

@Component({
  selector: 'app-store-card',
  templateUrl: './storeCard.component.html',
  styleUrls: ['./storeCard.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class StoreCardComponent {
  @Input() store: IStoreWithDistance | null = null;
  constructor() {}
}
