import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './emailConfirmed.component.html',
  standalone: true,
  imports: [IonContent],
})
export class EmailConfirmedComponent {
  constructor() {}
}
