import { Injectable, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '../../../app/library/persistentService/Store.enum';
import { PersistentService } from '../../../app/library/persistentService/PersistentService.service';
import { Language } from './Language.enum';

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

  get language(): Signal<string> {
    return this._language.asReadonly();
  }

  set language(language: string) {
    this._language.set(language);
    this.translate.use(language);
  }
}
