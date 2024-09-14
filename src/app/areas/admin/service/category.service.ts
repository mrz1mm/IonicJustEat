import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { CategoryRequest } from '../interfaces/CategoryRequest.interface';
import { CategoryResponse } from '../interfaces/CategoryResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _category = signal<CategoryResponse | null>(null);
  private _allCategories = signal<CategoryResponse[]>([]);
  categoryUrl: string = `${environment.apiUrl}/api/`; // ???
  tempUrl: string = `${environment.apiUrl}/api/OrderProcessing/stores`;

  constructor(private http: HttpClient, private router: Router) {}

  get allCategories(): Signal<CategoryResponse[] | null> {
    return this._allCategories.asReadonly();
  }

  get category(): Signal<CategoryResponse | null> {
    return this._category.asReadonly();
  }

  getAllCategories(): void {
    firstValueFrom(this.http.get<CategoryResponse[]>(this.tempUrl))
      .then((response) => {
        console.log('categorys retrieved');
        this._allCategories.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving categorys', error);
      })
      .finally(() => {});
  }

  getCategoryById(id: string): void {
    firstValueFrom(this.http.get<CategoryResponse>(`${this.categoryUrl}/${id}`))
      .then((response) => {
        console.log('category retrieved', response);
        this._category.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving category', error);
      })
      .finally(() => {});
  }

  addCategory(model: CategoryRequest): void {
    firstValueFrom(this.http.post(this.categoryUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateCategory(id: string, model: CategoryRequest): void {
    firstValueFrom(this.http.put(`${this.categoryUrl}/${id}`, model))
      .then(() => {
        console.log('category updated');
      })
      .catch((error) => {
        console.error('Error updating category', error);
      })
      .finally(() => {});
  }

  deleteCategory(id: string): void {
    firstValueFrom(this.http.delete(`${this.categoryUrl}/${id}`))
      .then(() => {
        console.log('category deleted');
      })
      .catch((error) => {
        console.error('Error deleting category', error);
      })
      .finally(() => {});
  }
}
