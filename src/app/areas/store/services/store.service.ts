import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PersistentService } from 'src/app/library/persistentService/PersistentService.service';
import { environment } from 'src/environments/environment';
import { StoreRequest } from '../interfaces/StoreRequest.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  storeUrl: string = `${environment.apiUrl}/api/`; // ???

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistentSvc: PersistentService,
    private jwtHelper: JwtHelperService
  ) {}

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

  getAllStores(): void {
    firstValueFrom(this.http.get(this.storeUrl))
      .then(() => {
        console.log('Stores retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving stores', error);
      })
      .finally(() => {});
  }

  getStoreById(id: string): void {
    firstValueFrom(this.http.get(`${this.storeUrl}/${id}`))
      .then(() => {
        console.log('Store retrieved');
      })
      .catch((error) => {
        console.error('Error retrieving store', error);
      })
      .finally(() => {});
  }

  updateStore(id: number): void {
    firstValueFrom(this.http.put(`${this.storeUrl}/${id}`, {}))
      .then(() => {
        console.log('Store updated');
      })
      .catch((error) => {
        console.error('Error updating store', error);
      })
      .finally(() => {});
  }

  deleteStore(id: number): void {
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
