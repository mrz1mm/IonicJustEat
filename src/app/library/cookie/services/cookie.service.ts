import { Injectable, signal, Signal } from '@angular/core';
import { PersistentService } from '../../persistentService/PersistentService.service';
import { ICookie } from '../interfaces/ICookie.interface';
import { Store } from '../../persistentService/Store.enum';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private _cookies = this.persistentSvc.PSignal<ICookie | null>(Store.COOKIES, {
    essentialCookies: true,
    analyticsCookies: null,
    functionalCookies: null,
    targetingCookies: null,
  });

  constructor(private persistentSvc: PersistentService) {}

  get cookies(): Signal<ICookie | null> {
    return this._cookies.asReadonly();
  }

  acceptAllCookies(): void {
    this._cookies.set({
      essentialCookies: true,
      analyticsCookies: true,
      functionalCookies: true,
      targetingCookies: true,
    });
  }

  acceptEssentialCookies(): void {
    this._cookies.set({
      essentialCookies: true,
      analyticsCookies: false,
      functionalCookies: false,
      targetingCookies: false,
    });
  }

  toggleAnalyticsCookies(): void {
    const current = this._cookies();
    if (current) {
      this._cookies.set({
        ...current,
        analyticsCookies: !current.analyticsCookies,
      });
    }
  }

  toggleFunctionalCookies(): void {
    const current = this._cookies();
    if (current) {
      this._cookies.set({
        ...current,
        functionalCookies: !current.functionalCookies,
      });
    }
  }

  toggleTargetingCookies(): void {
    const current = this._cookies();
    if (current) {
      this._cookies.set({
        ...current,
        targetingCookies: !current.targetingCookies,
      });
    }
  }
}
