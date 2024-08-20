import { Injectable, WritableSignal, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistentService {
  private key = 'store';

  PSignal<T>(key: string, initialState: T): WritableSignal<T> {
    const store = this.getStore();
    const SignalState = signal<T>(
      store[key] !== undefined ? store[key] : initialState
    );
    effect(() => {
      const currentStore = this.getStore();
      currentStore[key] = SignalState();
      this.saveStore(currentStore);
    });
    return SignalState;
  }

  private getStore(): any {
    const store = localStorage.getItem(this.key);
    return store ? JSON.parse(store) : {};
  }

  private saveStore(store: any): void {
    localStorage.setItem(this.key, JSON.stringify(store));
  }
}
