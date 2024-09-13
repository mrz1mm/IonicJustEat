import { computed, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CookiesComponent } from 'src/app/layout/cookies/cookies.component';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class CookieModalService {
  cookies = computed(() => this.cookieSvc.cookies());
  constructor(
    private modalController: ModalController,
    private cookieSvc: CookieService
  ) {}

  // Mostra il modale solo se necessario
  async showCookieModalIfNecessary() {
    const cookies = this.cookies;
    if (
      cookies()?.analyticsCookies === null &&
      cookies()?.functionalCookies === null &&
      cookies()?.targetingCookies === null
    ) {
      await this.showCookieModal();
    }
  }

  async showCookieModal() {
    const modal = await this.modalController.create({
      component: CookiesComponent,
      backdropDismiss: false,
      cssClass: 'cookieModal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data.accepted) {
        this.cookieSvc.acceptAllCookies();
      } else {
        this.cookieSvc.acceptEssentialCookies();
      }
    });

    await modal.present();
  }
}
