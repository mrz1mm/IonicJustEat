import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { DownloadAppComponent } from './components/downloadApp/downloadApp.component';
import { HeroComponent } from './components/homeHero/homeHero.component';
import { HowItWorksComponent } from './components/howItWorks/howItWorks.component';
import { WhatDoYouWantComponent } from './components/whatDoYouWant/whatDoYouWant.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-home',
  templateUrl: './userHome.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonContent,
    TranslateModule,
    HeroComponent,
    HowItWorksComponent,
    DownloadAppComponent,
    WhatDoYouWantComponent,
    FooterComponent,
  ],
})
export class HomePage {}
