import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contact-hero',
  templateUrl: './contactHero.component.html',
  styleUrls: ['./contactHero.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class ContactHeroComponent {
  constructor() {}
}
