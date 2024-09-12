import { Component, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonList,
} from '@ionic/angular/standalone';
import { CookieService } from 'src/app/library/cookie/services/cookie.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonButton,
    IonToggle,
    IonLabel,
    IonItem,
    IonItemDivider,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonModal,
    TranslateModule,
  ],
})
export class CookiesComponent {
  cookies = computed(() => this.cookieService.cookies());

  constructor(private cookieService: CookieService) {}

  acceptAllCookies(): void {
    this.cookieService.acceptAllCookies();
  }

  acceptEssentialCookies(): void {
    this.cookieService.acceptEssentialCookies();
  }

  toggleFunctionalCookies(): void {
    this.cookieService.toggleFunctionalCookies();
  }

  toggleAnalyticsCookies(): void {
    this.cookieService.toggleAnalyticsCookies();
  }

  toggleTargetingCookies(): void {
    this.cookieService.toggleTargetingCookies();
  }
}
