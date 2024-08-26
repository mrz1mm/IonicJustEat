import { effect, Injectable, Signal } from '@angular/core';
import { Store } from './Store';
import { PersistentService } from '../../app/library/persistentService/PersistentService.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = this.persistentSvc.PSignal<string>(
    Store.THEME,
    this.getInitialTheme()
  );

  constructor(private persistentSvc: PersistentService) {
    effect(() => {
      this.applyTheme(this._theme());
    });
  }

  getTheme(): Signal<string> {
    return this._theme.asReadonly();
  }

  setTheme(theme: string): void {
    this._theme.set(theme);
  }

  private applyTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }

  private getInitialTheme(): string {
    const storedTheme = this.persistentSvc.PSignal('theme', null)();
    if (storedTheme) {
      return storedTheme;
    }
    // Rileva la preferenza del broeser
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
}
