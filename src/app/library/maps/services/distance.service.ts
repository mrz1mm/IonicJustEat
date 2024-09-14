import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';
import { IStoreWithDistance } from '../interfaces/iStoreWithDistance.interface';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  // Signal privato per mantenere i ristoranti con la distanza calcolata
  private _storesWithDistance = signal<IStoreWithDistance[] | null>(null);
  stores = computed(() => this.storeSvc.allStores());
  coords = computed(() => this.geosearchSvc.coordinates());

  constructor(
    private storeSvc: StoreService,
    private geosearchSvc: GeosearchService
  ) {}
  // Metodo per calcolare le distanze
  calculateStoresWithDistance(): void {
    const stores = this.stores();
    const coords = this.coords();

    // Debug: Log dei dati
    console.log('Method triggered - Stores:', stores);
    console.log('Method triggered - Coordinates:', coords);

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
        // Converti latitude e longitude in numeri
        const storeLat = parseFloat(store.latitude);
        const storeLon = parseFloat(store.longitude);

        // Verifica se la conversione è riuscita
        if (isNaN(storeLat) || isNaN(storeLon)) {
          console.error('Invalid coordinates for store:', store);
          return null; // Salta questo store se le coordinate non sono valide
        }

        const distance = this.calculateDistance(
          coords.Latitude,
          coords.Longitude,
          storeLat,
          storeLon
        );

        return { ...store, distance: distance }; // Aggiungi la distanza direttamente all'oggetto IStoreWithDistance
      })
      .filter((store): store is IStoreWithDistance => store !== null); // Filtra gli store non validi

    // Debug: Log dei risultati
    console.log('Stores with calculated distance:', storesWithDistance);

    // Aggiorna il signal privato
    this._storesWithDistance.set(storesWithDistance);
  }

  // Getter per esportare il signal in sola lettura
  get storesWithDistance(): Signal<IStoreWithDistance[] | null> {
    return this._storesWithDistance.asReadonly();
  }

  // Calcola la distanza tra due coordinate usando la formula dell'Haversine
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // km
    const x1 = lat2 - lat1;
    const dLat = this.toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = this.toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  // Converti i gradi in radianti
  private toRad(x: number): number {
    return (x * Math.PI) / 180;
  }
}
