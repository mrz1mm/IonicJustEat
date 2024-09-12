import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent } from '@ionic/angular/standalone';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  standalone: true,
  imports: [IonContent, TranslateModule, FooterComponent],
})
export class TermsPage {
  constructor() {}
}
