import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { CategoryRequest } from '../interfaces/CategoryRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  getAllCategories(): void {
    firstValueFrom(this.http.get(this.categoryUrl))
      .then(() => {
        console.log('categorys retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving categorys', error);
      })
      .finally(() => {});
  }

  getCategoryById(id: string): void {
    firstValueFrom(this.http.get(`${this.categoryUrl}/${id}`))
      .then(() => {
        console.log('category retrieved');
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

  updateCategory(id: number): void {
    firstValueFrom(this.http.put(`${this.categoryUrl}/${id}`, id))
      .then(() => {
        console.log('category updated');
      })
      .catch((error) => {
        console.error('Error updating category', error);
      })
      .finally(() => {});
  }

  deleteCategory(id: number): void {
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
