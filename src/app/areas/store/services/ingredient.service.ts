import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IngredientRequest } from '../interfaces/IngredientRequest.interface';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { IngredientResponse } from '../interfaces/IngredientResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private _ingredient = signal<IngredientResponse | null>(null);
  private _allIngredients = signal<IngredientResponse[]>([]);
  ingredientUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(private http: HttpClient, private router: Router) {}

  get ingredient(): Signal<IngredientResponse | null> {
    return this._ingredient.asReadonly();
  }

  get allIngredients(): Signal<IngredientResponse[] | null> {
    return this._allIngredients.asReadonly();
  }

  getAllIngredients(): void {
    firstValueFrom(this.http.get<IngredientResponse[]>(this.ingredientUrl))
      .then((response) => {
        console.log('Ingredients retrieved');
        this._allIngredients.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving ingredients', error);
      })
      .finally(() => {});
  }

  getIngredientById(id: string): void {
    firstValueFrom(
      this.http.get<IngredientResponse>(`${this.ingredientUrl}/${id}`)
    )
      .then((response) => {
        console.log('Ingredient retrieved');
        this._ingredient.set(response);
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

  updateIngredient(id: string, model: IngredientRequest): void {
    firstValueFrom(this.http.put(`${this.ingredientUrl}/${id}`, model))
      .then(() => {
        console.log('Ingredient updated');
      })
      .catch((error) => {
        console.error('Error updating ingredient', error);
      })
      .finally(() => {});
  }

  deleteIngredient(id: string): void {
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
