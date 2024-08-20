import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroComponent } from '../components/hero/hero.component';
import { HowItWorksComponent } from '../components/howItWorks/howItWorks.component';
import { DownloadAppComponent } from '../components/downloadApp/downloadApp.component';
import { WhatDoYouWantComponent } from '../components/whatDoYouWant/whatDoYouWant.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    TranslateModule,
    HeroComponent,
    HowItWorksComponent,
    DownloadAppComponent,
    WhatDoYouWantComponent,
  ],
})
export class HomePage {}
