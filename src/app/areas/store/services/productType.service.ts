import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { ProductTypeRequest } from '../interfaces/ProductTypeRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  productTypeUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  getAllProductTypes(): void {
    firstValueFrom(this.http.get(this.productTypeUrl))
      .then(() => {
        console.log('productTypes retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving productTypes', error);
      })
      .finally(() => {});
  }

  getProductTypeById(id: string): void {
    firstValueFrom(this.http.get(`${this.productTypeUrl}/${id}`))
      .then(() => {
        console.log('productType retrieved');
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

  updateProductType(id: number): void {
    firstValueFrom(this.http.put(`${this.productTypeUrl}/${id}`, id))
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
