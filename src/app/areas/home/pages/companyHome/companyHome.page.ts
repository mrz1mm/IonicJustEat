import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { Path } from 'src/app/library/utils/Path';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './companyHome.page.html',
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonItem,
    IonContent,
    TranslateModule,
    FooterComponent,
    CommonModule,
    RouterModule,
  ],
})
export class CompanyHomePage {
  Path = Path;
}
