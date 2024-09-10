import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { checkmark } from 'ionicons/icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-what-do-you-want',
  templateUrl: './whatDoYouWant.component.html',
  styleUrls: ['whatDoYouWant.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonIcon, IonCol, IonRow, IonGrid, TranslateModule],
})
export class WhatDoYouWantComponent {
  Env = environment;
  constructor() {
    addIcons({
      checkmark: checkmark,
    });
  }
}
