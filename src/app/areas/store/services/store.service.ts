import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StoreRequest } from '../interfaces/StoreRequest.interface';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { StoreResponse } from '../interfaces/StoreResponse.interface';
import { DistanceService } from 'src/app/library/maps/services/distance.service';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';
import { IStoreWithDistance } from '../interfaces/iStoreWithDistance.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _store = signal<StoreResponse | null>(null);
  private _allStores = signal<StoreResponse[] | null>(null);
  private _storesWithDistance = signal<IStoreWithDistance[] | null>(null);
  private _filterCriteria = signal<Partial<IStoreWithDistance>>({});
  private _filteredStores = signal<IStoreWithDistance[] | null>(null);
  coords = computed(() => this.geosearchSvc.coordinates());
  storeUrl: string = `${environment.apiUrl}/api/StoreManagement/createstore`;
  tempUrl: string = `${environment.apiUrl}/api/OrderProcessing/stores`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService,
    private distanceSvc: DistanceService,
    private geosearchSvc: GeosearchService
  ) {}

  get store(): Signal<StoreResponse | null> {
    return this._store.asReadonly();
  }

  get allStores(): Signal<StoreResponse[] | null> {
    return this._allStores.asReadonly();
  }

  get filteredStores(): Signal<IStoreWithDistance[] | null> {
    return this._filteredStores.asReadonly();
  }

  // Getter per filterCriteria
  get filterCriteria(): Signal<Partial<IStoreWithDistance>> {
    return this._filterCriteria.asReadonly();
  }

  // Setter per filterCriteria
  setFilterCriteria(
    key: keyof IStoreWithDistance,
    value: string | number | null
  ): void {
    const currentCriteria = this._filterCriteria();
    const newCriteria = { ...currentCriteria };

    // Aggiungi o rimuovi il criterio di filtro
    if (value === null || value === undefined) {
      delete newCriteria[key];
    } else {
      // Cast il tipo di value in modo che TypeScript non dia errore
      newCriteria[key] = value as any;
    }

    // Aggiorna _filterCriteria
    this._filterCriteria.set(newCriteria);
    this.applyFilters();
  }

  getAllStores(): void {
    firstValueFrom(this.http.get<StoreResponse[]>(this.tempUrl))
      .then((response) => {
        console.log('Stores retrieved');
        this._allStores.set(response);

        if (this.coords()) {
          // Calcola le distanze una volta recuperati gli store
          this.calculateStoresWithDistance();

          // Applica i filtri per popolare filteredStores
          this.applyFilters();
        }
      })
      .catch((error) => {
        console.error('Error retrieving stores', error);
      })
      .finally(() => {});
  }

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

  private calculateStoresWithDistance(): void {
    const stores = this.allStores();
    const coords = this.coords();

    if (!stores || stores.length === 0) {
      console.warn('No stores available or stores array is empty.');
      this._storesWithDistance.set(null); // Imposta null se i dati non sono disponibili
      return;
    }

    if (!coords || !coords.Latitude || !coords.Longitude) {
      console.warn('Coordinates are not available or are invalid.');
      this._storesWithDistance.set(null); // Imposta null se le coordinate non sono disponibili
      return;
    }

    // Calcola la distanza per ciascun ristorante e aggiungila a IStoreWithDistance
    const storesWithDistance = stores
      .map((store) => {
        const storeLat = parseFloat(store.latitude);
        const storeLon = parseFloat(store.longitude);

        // Verifica se la conversione è riuscita
        if (isNaN(storeLat) || isNaN(storeLon)) {
          console.error('Invalid coordinates for store:', store);
          return null;
        }

        const distance = this.distanceSvc.calculateDistance(
          coords.Latitude,
          coords.Longitude,
          storeLat,
          storeLon
        );

        return { ...store, distance: distance };
      })
      .filter((store): store is IStoreWithDistance => store !== null); // Filtra gli store non validi

    this._storesWithDistance.set(storesWithDistance);
  }

  private applyFilters(): void {
    const stores = this._storesWithDistance();

    if (!stores) {
      console.warn('No stores available or stores array is empty.');
      this._filteredStores.set(null);
      return;
    }

    // Effettua il filtro basato sui criteri
    const filteredStores = stores.filter((store) => {
      for (const key in this.filterCriteria()) {
        const k = key as keyof IStoreWithDistance;
        const filterValue = this.filterCriteria()[k];

        if (filterValue === undefined || filterValue === null) {
          continue; // Salta se il valore del filtro non è definito
        }

        // Se il filtro è sulla distanza, effettua un confronto numerico
        if (
          k === 'distance' &&
          typeof store[k] === 'number' &&
          typeof filterValue === 'number'
        ) {
          if (store[k] > filterValue) {
            return false;
          }
        }
        // Altrimenti, effettua un controllo di uguaglianza
        else if (store[k] !== filterValue) {
          return false;
        }
      }
      return true;
    });

    console.log('Filtered stores:', filteredStores);
    this._filteredStores.set(filteredStores);
  }

  updateFilter<K extends keyof IStoreWithDistance>(
    property: K,
    value: IStoreWithDistance[K] | null
  ): void {
    if (value === null || value === undefined) {
      delete this.filterCriteria()[property];
    } else {
      this.filterCriteria()[property] = value;
    }

    this.applyFilters();
  }
}
