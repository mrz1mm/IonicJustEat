import { Injectable } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

@Injectable({
  providedIn: 'root',
})
export class GeosearchService {
  provider = new OpenStreetMapProvider();

  search(query: string): Promise<SearchResult[]> {
    return this.provider.search({ query });
  }
}
