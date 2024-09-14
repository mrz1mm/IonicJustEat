import { computed, effect, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
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
