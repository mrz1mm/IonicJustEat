import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { i18nService } from '../../../assets/i18n/library/i18nService.service';
import { Language } from '../../../assets/i18n/library/Language.enum';
import { AnimationController } from '@ionic/angular';
import {
  IonIcon,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonToolbar,
  IonHeader,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonPopover,
  IonModal,
  IonAvatar,
  IonContent,
  IonButtons,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  close,
  sunny,
  moon,
  menu,
  person,
  checkmark,
  personCircle,
  personOutline,
  logInOutline,
  logOutOutline,
} from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ThemeService } from 'src/theme/library/theme.service';
import { Path } from 'src/app/library/utils/Path';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/areas/auth/services/auth.service';
import { Store } from 'src/theme/library/Store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.scss', './header.component.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonButtons,
    IonContent,
    IonAvatar,
    IonModal,
    IonPopover,
    IonLabel,
    IonItem,
    IonList,
    IonImg,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    TranslateModule,
    CommonModule,
    RouterModule,
  ],
})
export class HeaderComponent {
  Path = Path;
  Env = environment;
  Store = Store;

  currentLanguage = computed<string>(() => this.i18nSvc.language());
  currentTheme = computed<string>(() => this.themeSvc.theme());
  currentUser = computed(() => this.authSvc.userData());
  currentFlag: string = '';
  IT = Language.Italian;
  EN = Language.English;

  isFlagMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  languagePopoverEvent: MouseEvent | undefined;
  profilePopoverEvent: MouseEvent | undefined;

  constructor(
    private i18nSvc: i18nService,
    private animationCtrl: AnimationController,
    private themeSvc: ThemeService,
    private authSvc: AuthService
  ) {
    effect(() => {
      this.updateCurrentFlag(this.currentLanguage());
    });

    addIcons({
      checkmark,
      person,
      personCircle,
      logInOutline,
      personOutline,
      logOutOutline,
      sunny,
      moon,
      menu,
      close,
    });
  }

  // Language
  protected languagePopover(event: MouseEvent): void {
    this.languagePopoverEvent = event;
    this.isFlagMenuOpen.set(true);
  }

  protected changeLanguage(language: string): void {
    this.i18nSvc.language = language;
    this.isFlagMenuOpen.set(false);
  }

  private updateCurrentFlag(language: string): void {
    this.currentFlag = `${this.Env.assetsUrl}/img/utilities/${language}.svg`;
  }

  // Theme
  protected toggleTheme(): void {
    this.themeSvc.theme = this.currentTheme() === 'light' ? 'dark' : 'light';
  }

  // Auth
  protected profilePopover(event: MouseEvent): void {
    this.profilePopoverEvent = event;
    this.isProfileMenuOpen.set(true);
  }

  logout(): void {
    this.authSvc.logout();
    this.closeProfileMenu();
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen.set(false);
  }

  // Modal
  protected enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(300)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  protected leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
