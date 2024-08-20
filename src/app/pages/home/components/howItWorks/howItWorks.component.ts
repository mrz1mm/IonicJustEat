import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './howItWorks.component.html',
  standalone: true,
  imports: [TranslateModule],
})
export class HowItWorksComponent {
  constructor() {}
}
