import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {} from '@ionic/angular/standalone';

@Component({
  selector: 'app-account-and-preferences',
  templateUrl: './accountAndPreferences.component.html',
  styleUrls: [
    '../../../../../app.component.scss',
    'accountAndPreferences.component.scss',
  ],
  standalone: true,
  imports: [TranslateModule],
})
export class AccountAndPreferencesComponent {
  constructor() {}
}
