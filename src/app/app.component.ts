import { Component, computed } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonContent } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { i18nService } from 'src/assets/i18n/library/i18nService.service';
import { ThemeService } from 'src/theme/library/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonContent, TranslateModule, RouterModule],
})
export class AppComponent {
  currentLanguage = computed<string>(() => this.i18nSvc.language());
  currentTheme = computed<string>(() => this.themeSvc.theme());

  constructor(private i18nSvc: i18nService, private themeSvc: ThemeService) {
    register();
    addIcons({
      'close-circle-outline': closeCircleOutline,
    });
  }
}
