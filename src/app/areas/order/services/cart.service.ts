import { Injectable, Signal } from '@angular/core';
import { ProductResponse } from '../../store/interfaces/ProductResponse.interface';
import { PersistentService } from 'src/app/library/persistentService/PersistentService.service';
import { Store } from 'src/app/library/persistentService/Store.enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = this.persistentSvc.PSignal<ProductResponse[] | null>(
    Store.CART,
    null
  );

  constructor(private persistentSvc: PersistentService) {}

  get cart(): Signal<ProductResponse[] | null> {
    return this._cart.asReadonly();
  }

  addProduct(product: ProductResponse): void {
    this._cart.update((cart) => {
      if (!cart) return [product];
      return [...cart, product];
    });
  }

  removeProduct(product: ProductResponse): void {
    this._cart.update((cart) => {
      if (!cart) return [];
      return cart.filter((p) => p.ProductId !== product.ProductId);
    });
  }

  clearCart(): void {
    this._cart.set(null);
  }
}
