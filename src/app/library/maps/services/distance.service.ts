import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  private _distance = signal<number | null>(null);

  get distance(): Signal<number | null> {
    return this._distance.asReadonly();
  }

  // Calcola la distanza tra due coordinate usando la formula dell'Haversine
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): void {
    const R = 6371; // Raggio della Terra in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distanza in km
    this._distance.set(distance);
  }

  // Converti i gradi in radianti
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Simulazione del tempo medio di viaggio in minuti (20 km/h)
  calculateTravelTime(distance: number): number {
    const speed = 30; // km/h
    const travelTime = (distance / speed) * 60; // Tempo in minuti
    return travelTime;
  }
}
