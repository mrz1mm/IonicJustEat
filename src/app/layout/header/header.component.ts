import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { i18nService } from '../../../assets/i18n/library/i18nService.service';
import { Language } from '../../../assets/i18n/library/Language';

@Component({
  selector: 'app-header',
  templateUrl: './Header.component.html',
  standalone: true,
  imports: [TranslateModule, CommonModule],
})
export class HeaderComponent {
  currentLanguage = computed<string>(() => this.i18nSvc.getLanguage()());
  currentFlag: string = '';
  IT = Language.Italian;
  EN = Language.English;

  constructor(private i18nSvc: i18nService) {
    effect(() => {
      this.updateCurrentFlag(this.currentLanguage());
    });
  }

  changeLanguage(language: string): void {
    this.i18nSvc.setLanguage(language);
  }

  private updateCurrentFlag(language: string): void {
    this.currentFlag = `../../../assets/img/utilities/${language}.svg`;
  }
}
