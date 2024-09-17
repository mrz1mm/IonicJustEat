import { Path } from 'src/app/library/utils/Path';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { IStoreWithDistance } from 'src/app/areas/store/interfaces/iStoreWithDistance.interface';

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
    CommonModule,
    RouterModule,
  ],
})
export class StoreCardComponent {
  Path = Path;
  @Input() store: IStoreWithDistance | null = null;
  constructor() {}
}
