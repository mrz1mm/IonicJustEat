import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {} from '@ionic/angular/standalone';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['../../../../../app.component.scss', 'payments.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class PaymentsComponent {
  constructor() {}
}
