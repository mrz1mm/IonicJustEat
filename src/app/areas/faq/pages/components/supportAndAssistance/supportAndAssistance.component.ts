import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {} from '@ionic/angular/standalone';

@Component({
  selector: 'app-support-and-assistance',
  templateUrl: './supportAndAssistance.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'supportAndAssistance.component.scss',
  ],
  standalone: true,
  imports: [TranslateModule],
})
export class SupportAndAssistanceComponent {
  constructor() {}
}
