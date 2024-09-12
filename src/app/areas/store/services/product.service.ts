import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { ProductRequest } from '../interfaces/ProductRequest.interface';
import { ProductResponse } from '../interfaces/ProductResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _product = signal<ProductRequest | null>(null);
  private _allProducts = signal<ProductResponse[] | null>(null);
  productUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  get product(): Signal<ProductRequest | null> {
    return this._product.asReadonly();
  }

  getAllProducts(): void {
    firstValueFrom(this.http.get<ProductResponse[]>(this.productUrl))
      .then((response) => {
        console.log('products retrieved');
        this._allProducts.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving products', error);
      })
      .finally(() => {});
  }

  getProductById(id: string): void {
    firstValueFrom(this.http.get<ProductResponse>(`${this.productUrl}/${id}`))
      .then((response) => {
        console.log('product retrieved', response);
        this._product.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving product', error);
      })
      .finally(() => {});
  }

  addProduct(model: ProductRequest): void {
    firstValueFrom(this.http.post(this.productUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateProduct(id: string, model: ProductRequest): void {
    firstValueFrom(this.http.put(`${this.productUrl}/${id}`, model))
      .then(() => {
        console.log('product updated');
      })
      .catch((error) => {
        console.error('Error updating product', error);
      })
      .finally(() => {});
  }

  deleteProduct(id: number): void {
    firstValueFrom(this.http.delete(`${this.productUrl}/${id}`))
      .then(() => {
        console.log('product deleted');
      })
      .catch((error) => {
        console.error('Error deleting product', error);
      })
      .finally(() => {});
  }
}
