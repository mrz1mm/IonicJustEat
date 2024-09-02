import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonImg,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonInput,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { GeosearchService } from 'src/app/layout/shared/services/geoSearch.service';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-hero',
  templateUrl: './homeHero.component.html',
  styleUrls: ['../../../../../app.component.scss', 'homeHero.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonInput,
    IonToolbar,
    IonHeader,
    TranslateModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonImg,
    IonIcon,
    FormsModule,
  ],
})
export class HeroComponent {
  Env = environment;
  address: string = '';
  suggestions: SearchResult[] = [];
  highlightedIndex: number = -1;
  searchTimeout: any;

  @ViewChild('searchBar', { static: true }) searchBarRef!: ElementRef<IonInput>;

  constructor(private geosearchService: GeosearchService) {}

  onInputChange(event: any): void {
    const value = event.target.value;
    this.address = value;

    // Cancella il timeout precedente
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Imposta un nuovo timeout per la ricerca con debounce
    this.searchTimeout = setTimeout(async () => {
      if (value) {
        this.suggestions = await this.geosearchService.search(value);
      } else {
        this.suggestions = [];
      }
    }, 300);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.suggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.highlightedIndex =
          (this.highlightedIndex + 1) % this.suggestions.length;
        console.log(
          'ArrowDown pressed, highlightedIndex:',
          this.highlightedIndex
        );
        console.log(
          'Element with highlight:',
          this.suggestions[this.highlightedIndex]
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.highlightedIndex =
          (this.highlightedIndex > 0
            ? this.highlightedIndex
            : this.suggestions.length) - 1;
        console.log(
          'ArrowUp pressed, highlightedIndex:',
          this.highlightedIndex
        );
        console.log(
          'Element with highlight:',
          this.suggestions[this.highlightedIndex]
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (
          this.highlightedIndex >= 0 &&
          this.highlightedIndex < this.suggestions.length
        ) {
          this.selectAddress(this.suggestions[this.highlightedIndex]);
        }
      }
    }
  }

  selectAddress(suggestion: SearchResult): void {
    this.address = suggestion.label;
    this.suggestions = [];
    console.log('Selected address:', suggestion);

    if (this.searchBarRef && this.searchBarRef.nativeElement) {
      this.searchBarRef.nativeElement.setFocus();
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.address.trim()) return;
    console.log('Submitted address:', this.address);
    // Aggiungi la logica per la gestione del submit
  }
}
