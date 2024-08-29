import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-just-eat-takeaway-description',
  templateUrl: './justEatTakeawayDescription.component.html',
  standalone: true,
  imports: [TranslateModule, HeaderComponent, FooterComponent],
})
export class JustEatTakeawayDescriptionComponent {
  constructor() {}
}
