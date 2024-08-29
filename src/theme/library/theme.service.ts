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

  get theme(): Signal<string> {
    return this._theme.asReadonly();
  }

  set theme(theme: string) {
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
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
}
