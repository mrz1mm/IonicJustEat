import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-just-eat-description',
  templateUrl: './justEatDescription.component.html',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
  ],
})
export class JustEatDescriptionComponent {
  constructor() {}
}
