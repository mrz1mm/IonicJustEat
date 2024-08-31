import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonGrid, IonCol, IonRow, IonImg } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us-hero',
  templateUrl: './aboutUsHero.component.html',
  styleUrls: ['./aboutUsHero.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonRow,
    IonCol,
    IonGrid,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
  ],
})
export class AboutUsHeroComponent {
  Env = environment;
  constructor() {}
}
