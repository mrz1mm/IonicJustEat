import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { ProductTypeRequest } from '../interfaces/ProductTypeRequest.interface';
import { ProductTypeResponse } from '../interfaces/ProductTypeResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  private _productType = signal<ProductTypeResponse | null>(null);
  private _allProductTypes = signal<ProductTypeResponse[]>([]);
  productTypeUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  get productType(): Signal<ProductTypeResponse | null> {
    return this._productType.asReadonly();
  }

  get allProductTypes(): Signal<ProductTypeResponse[] | null> {
    return this._allProductTypes.asReadonly();
  }

  getAllProductTypes(): void {
    firstValueFrom(this.http.get<ProductTypeResponse[]>(this.productTypeUrl))
      .then((response) => {
        console.log('productTypes retrieved');
        this._allProductTypes.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving productTypes', error);
      })
      .finally(() => {});
  }

  getProductTypeById(id: string): void {
    firstValueFrom(
      this.http.get<ProductTypeResponse>(`${this.productTypeUrl}/${id}`)
    )
      .then((response) => {
        console.log('productType retrieved', response);
        this._productType.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving productType', error);
      })
      .finally(() => {});
  }

  addProductType(model: ProductTypeRequest): void {
    firstValueFrom(this.http.post(this.productTypeUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateProductType(id: string, model: ProductTypeRequest): void {
    firstValueFrom(this.http.put(`${this.productTypeUrl}/${id}`, model))
      .then(() => {
        console.log('productType updated');
      })
      .catch((error) => {
        console.error('Error updating productType', error);
      })
      .finally(() => {});
  }

  deleteProductType(id: number): void {
    firstValueFrom(this.http.delete(`${this.productTypeUrl}/${id}`))
      .then(() => {
        console.log('productType deleted');
      })
      .catch((error) => {
        console.error('Error deleting productType', error);
      })
      .finally(() => {});
  }
}
