import {
  Component,
  computed,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';

@Component({
  selector: 'app-user-home-hero',
  templateUrl: './userHomeHero.component.html',
  styleUrls: [
    '../../../../../../app.component.scss',
    'userHomeHero.component.scss',
  ],
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
    CommonModule,
  ],
})
export class UserHomeHeroComponent {
  Env = environment;
  address: string = '';
  suggestionIndex: number = -1;
  searchTimeout: any;
  suggestions = computed(() => this.geosearchSvc.suggestions());
  latitude = computed(() => this.geosearchSvc.latitude());
  longitude = computed(() => this.geosearchSvc.longitude());

  @ViewChild('searchBar', { static: true }) searchBarRef!: ElementRef<IonInput>;
  @ViewChildren('suggestionItem', { read: ElementRef })
  suggestionItems!: QueryList<ElementRef>;

  constructor(private geosearchSvc: GeosearchService) {}

  onInputChange(event: any): void {
    const value = event.target.value;
    this.address = value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (value) {
        this.geosearchSvc.searchAndUpdateSuggestions(value); // Avvia la ricerca tramite il servizio
      } else {
        this.geosearchSvc.clearSuggestions(); // Cancella i suggerimenti
      }
    }, 300);
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyActions: { [key: string]: () => void } = {
      ArrowDown: () => {
        this.suggestionIndex =
          (this.suggestionIndex + 1) % this.suggestions().length;
        this.focusSuggestion();
      },
      ArrowUp: () => {
        this.suggestionIndex =
          (this.suggestionIndex > 0
            ? this.suggestionIndex
            : this.suggestions().length) - 1;
        this.focusSuggestion();
      },
      Enter: () => {
        if (
          this.suggestionIndex >= 0 &&
          this.suggestionIndex < this.suggestions().length
        ) {
          this.selectAddress(this.suggestions()[this.suggestionIndex]);
        }
      },
    };

    if (this.suggestions.length > 0 && keyActions[event.key]) {
      event.preventDefault();
      keyActions[event.key]();
    }
  }

  focusSuggestion(): void {
    if (this.suggestionItems) {
      this.suggestionItems.forEach((item, index) => {
        const element = item.nativeElement;
        if (index === this.suggestionIndex) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          element.focus();
          console.log(
            'Focus index:',
            this.suggestionIndex,
            'Suggestion:',
            this.suggestions()[this.suggestionIndex]
          );
        }
      });
    }
  }

  selectAddress(suggestion: any): void {
    this.address = suggestion.label;
    this.geosearchSvc.clearSuggestions();
    this.suggestionIndex = -1;
    if (this.searchBarRef && this.searchBarRef.nativeElement) {
      this.searchBarRef.nativeElement.setFocus();
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.address.trim()) return;
    console.log(
      'Submit:',
      this.address,
      'Lat:',
      this.latitude(),
      'Lng:',
      this.longitude()
    );
  }
}
