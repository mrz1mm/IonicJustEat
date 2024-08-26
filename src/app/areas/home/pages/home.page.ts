import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroComponent } from './components/homeHero/homeHero.component';
import { HowItWorksComponent } from './components/howItWorks/howItWorks.component';
import { DownloadAppComponent } from './components/downloadApp/downloadApp.component';
import { WhatDoYouWantComponent } from './components/whatDoYouWant/whatDoYouWant.component';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonContent,
    TranslateModule,
    HeroComponent,
    HowItWorksComponent,
    DownloadAppComponent,
    WhatDoYouWantComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class HomePage {}
