import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './howItWorks.component.html',
  styleUrls: ['./howItWorks.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [TranslateModule, IonGrid, IonCol, IonRow],
})
export class HowItWorksComponent {
  Env = environment;
  constructor() {}
}
