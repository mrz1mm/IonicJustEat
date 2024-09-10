import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IngredientRequest } from '../interfaces/IngredientRequest.interface';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredientUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  getAllIngredients(): void {
    firstValueFrom(this.http.get(this.ingredientUrl))
      .then(() => {
        console.log('Ingredients retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving ingredients', error);
      })
      .finally(() => {});
  }

  getIngredientById(id: string): void {
    firstValueFrom(this.http.get(`${this.ingredientUrl}/${id}`))
      .then(() => {
        console.log('Ingredient retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving ingredient', error);
      })
      .finally(() => {});
  }

  addIngredient(model: IngredientRequest): void {
    firstValueFrom(this.http.post(this.ingredientUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateIngredient(id: number): void {
    firstValueFrom(this.http.put(`${this.ingredientUrl}/${id}`, id))
      .then(() => {
        console.log('Ingredient updated');
      })
      .catch((error) => {
        console.error('Error updating ingredient', error);
      })
      .finally(() => {});
  }

  deleteIngredient(id: number): void {
    firstValueFrom(this.http.delete(`${this.ingredientUrl}/${id}`))
      .then(() => {
        console.log('Ingredient deleted');
      })
      .catch((error) => {
        console.error('Error deleting ingredient', error);
      })
      .finally(() => {});
  }
}
