import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { i18nService } from '../../../assets/i18n/library/i18nService.service';
import { Language } from '../../../assets/i18n/library/Language';
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
import { close, sunny, moon, menu, person } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ThemeService } from 'src/theme/library/theme.service';

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
  currentLanguage = computed<string>(() => this.i18nSvc.language());
  currentTheme = computed<string>(() => this.themeSvc.theme());
  currentFlag: string = '';
  IT = Language.Italian;
  EN = Language.English;
  isflagMenuOpen = signal(false);
  popoverEvent: MouseEvent | undefined;

  constructor(
    private i18nSvc: i18nService,
    private animationCtrl: AnimationController,
    private themeSvc: ThemeService
  ) {
    effect(() => {
      this.updateCurrentFlag(this.currentLanguage());
    });

    addIcons({
      close: close,
      sunny: sunny,
      moon: moon,
      menu: menu,
      person: person,
    });
  }

  // Language
  protected presentPopover(event: MouseEvent): void {
    this.popoverEvent = event;
    this.isflagMenuOpen.set(true);
  }

  protected changeLanguage(language: string): void {
    this.i18nSvc.language = language;
    this.isflagMenuOpen.set(false);
  }

  private updateCurrentFlag(language: string): void {
    this.currentFlag = `../../../assets/img/utilities/${language}.svg`;
  }

  // Theme
  protected toggleTheme(): void {
    this.themeSvc.theme = this.currentTheme() === 'light' ? 'dark' : 'light';
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
