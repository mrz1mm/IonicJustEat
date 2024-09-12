import { Injectable, signal, Signal } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeosearchService {
  private _suggestions = signal<SearchResult[]>([]);
  private _latitude = signal<number | null>(null);
  private _longitude = signal<number | null>(null);
  provider = new OpenStreetMapProvider();

  get suggestions(): Signal<SearchResult[]> {
    return this._suggestions.asReadonly();
  }

  get latitude(): Signal<number | null> {
    return this._latitude.asReadonly();
  }

  get longitude(): Signal<number | null> {
    return this._longitude.asReadonly();
  }

  async search(query: string): Promise<void> {
    try {
      const results = await this.provider.search({ query });
      if (results.length > 0) {
        const result = results[0];
        this._latitude.set(result.y);
        this._longitude.set(result.x);
        console.log(`Coordinates updated: ${result.y}, ${result.x}`);
      } else {
        this._latitude.set(null);
        this._longitude.set(null);
        console.log('No coordinates found for the given query.');
      }
    } catch (error) {
      console.error('Error during geosearch:', error);
    }
  }

  async searchAndUpdateSuggestions(query: string): Promise<void> {
    try {
      const results = await this.provider.search({ query });
      this._suggestions.set(results);
    } catch (error) {
      console.error('Error during geosearch:', error);
      this._suggestions.set([]);
    }
  }

  clearSuggestions(): void {
    this._suggestions.set([]);
  }
}
