import { Component, computed } from '@angular/core';
import { IonApp, IonRouterOutlet, IonModal } from '@ionic/angular/standalone';
import { IonContent } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { i18nService } from 'src/assets/i18n/library/i18nService.service';
import { ThemeService } from 'src/theme/library/theme.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './areas/auth/services/auth.service';
import { CookieService } from './library/cookie/services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonModal,
    IonApp,
    IonRouterOutlet,
    IonContent,
    TranslateModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  currentLanguage = computed<string>(() => this.i18nSvc.language());
  currentTheme = computed<string>(() => this.themeSvc.theme());
  currentUser = computed(() => this.authSvc.userData());
  cookies = computed(() => this.cookieSvc.cookies());

  constructor(
    private i18nSvc: i18nService,
    private themeSvc: ThemeService,
    private authSvc: AuthService,
    private cookieSvc: CookieService
  ) {
    register();
  }
}
