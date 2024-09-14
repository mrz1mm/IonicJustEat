import { Injectable, signal, Signal } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { iCoordinates } from '../interfaces/iCoordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class GeosearchService {
  private _suggestions = signal<SearchResult[]>([]);
  private _coordinates = signal<iCoordinates | null>(null);

  provider = new OpenStreetMapProvider();

  get suggestions(): Signal<SearchResult[]> {
    return this._suggestions.asReadonly();
  }

  get coordinates(): Signal<iCoordinates | null> {
    return this._coordinates.asReadonly();
  }

  async search(query: string): Promise<void> {
    try {
      const results = await this.provider.search({ query });
      if (results.length > 0) {
        const result = results[0];
        this._coordinates.set({ Latitude: result.y, Longitude: result.x });
        console.log(`Coordinates updated: ${result.y}, ${result.x}`);
      } else {
        this._coordinates.set(null);
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
