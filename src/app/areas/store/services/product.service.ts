import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { ProductRequest } from '../interfaces/ProductRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts(): void {
    firstValueFrom(this.http.get(this.productUrl))
      .then(() => {
        console.log('products retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving products', error);
      })
      .finally(() => {});
  }

  getProductById(id: string): void {
    firstValueFrom(this.http.get(`${this.productUrl}/${id}`))
      .then(() => {
        console.log('product retrieved');
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

  updateProduct(id: number): void {
    firstValueFrom(this.http.put(`${this.productUrl}/${id}`, id))
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
