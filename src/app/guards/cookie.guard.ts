import { computed, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from '../library/cookie/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class CookieGuard implements CanActivate {
  cookies = computed(() => this.cookieSvc.cookies());

  constructor(private cookieSvc: CookieService) {}

  async canActivate(): Promise<boolean> {
    const cookies = this.cookies;

    if (
      cookies()?.analyticsCookies === null &&
      cookies()?.functionalCookies === null &&
      cookies()?.targetingCookies === null
    ) {
      return false;
    }
    return true;
  }
}
