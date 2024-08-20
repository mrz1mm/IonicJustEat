import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './Language';
import { Store } from '../../../app/library/persistentService/Store';
import { PersistentService } from '../../../app/library/persistentService/PersistentService.service';

@Injectable({
  providedIn: 'root',
})
export class i18nService {
  private _language = this.persistentSvc.PSignal<string>(
    Store.LANGUAGE,
    Language.Italian
  );

  constructor(
    private translate: TranslateService,
    private persistentSvc: PersistentService
  ) {
    this.translate.setDefaultLang(Language.Italian);
    this.translate.use(this._language());
  }

  getLanguage() {
    return this._language.asReadonly();
  }

  setLanguage(language: string) {
    this._language.set(language);
    this.translate.use(language);
  }
}
