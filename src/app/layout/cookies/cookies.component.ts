import { Component, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ModalController,
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
import { environment } from 'src/environments/environment';

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
    TranslateModule,
  ],
})
export class CookiesComponent {
  Env = environment;
  isCustomizing = false;
  cookies = computed(() => this.cookieService.cookies());

  constructor(
    private cookieService: CookieService,
    private modalController: ModalController
  ) {
    console.log('Component initialized');
  }

  toggleCustomization(): void {
    this.isCustomizing = !this.isCustomizing;
  }

  acceptAllCookies(): void {
    this.cookieService.acceptAllCookies();
    this.modalController.dismiss();
  }

  acceptEssentialCookies(): void {
    this.cookieService.acceptEssentialCookies();
    this.modalController.dismiss();
  }

  toggleAnalyticsCookies(): void {
    this.cookieService.toggleAnalyticsCookies();
  }

  toggleFunctionalCookies(): void {
    this.cookieService.toggleFunctionalCookies();
  }

  toggleTargetingCookies(): void {
    this.cookieService.toggleTargetingCookies();
  }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
