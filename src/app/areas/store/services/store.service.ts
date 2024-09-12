import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StoreRequest } from '../interfaces/StoreRequest.interface';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { StoreResponse } from '../interfaces/StoreResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _store = signal<StoreResponse | null>(null);
  private _allStore = signal<StoreResponse[] | null>(null);
  storeUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService
  ) {}

  get store(): Signal<StoreRequest | null> {
    return this._store.asReadonly();
  }

  get allStore(): Signal<StoreRequest[] | null> {
    return this._allStore.asReadonly();
  }

  getAllStores(): void {
    firstValueFrom(this.http.get<StoreResponse[]>(this.storeUrl))
      .then((response) => {
        console.log('Stores retrieved');
        this._allStore.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving stores', error);
      })
      .finally(() => {});
  }

  getAllActiveStores(): void {}

  getStoreById(id: string): void {
    firstValueFrom(this.http.get<StoreResponse>(`${this.storeUrl}/${id}`))
      .then((response) => {
        console.log('Store retrieved');
        this._store.set(response);
      })
      .catch((error) => {
        console.error('Error retrieving store', error);
      })
      .finally(() => {});
  }

  getStoreIdByCurrentUser(): void {
    const userData = this.authSvc.userData();
    let userId: string | null = null;
    userData?.userId ? (userId = userData.userId) : null;

    firstValueFrom(this.http.get(`${this.storeUrl}/${userId}`))
      .then(() => {
        console.log('Store retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving store', error);
      })
      .finally(() => {});
  }

  addStore(model: StoreRequest): void {
    firstValueFrom(this.http.post(this.storeUrl, model))
      .then(() => {
        console.log('Store registered');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error registering store', error);
      })
      .finally(() => {});
  }

  updateStore(id: string, model: StoreRequest): void {
    firstValueFrom(this.http.put(`${this.storeUrl}/${id}`, model))
      .then(() => {
        console.log('Store updated');
      })
      .catch((error) => {
        console.error('Error updating store', error);
      })
      .finally(() => {});
  }

  deleteStore(id: string): void {
    firstValueFrom(this.http.delete(`${this.storeUrl}/${id}`))
      .then(() => {
        console.log('Store deleted');
      })
      .catch((error) => {
        console.error('Error deleting store', error);
      })
      .finally(() => {});
  }
}
