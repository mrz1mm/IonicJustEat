import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeosearchService } from 'src/app/library/maps/geoSearch.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home-hero',
  templateUrl: './homeHero.component.html',
  styleUrls: [
    '../../../../../../app.component.scss',
    'homeHero.component.scss',
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
export class HeroComponent {
  Env = environment;
  address: string = '';
  suggestions: SearchResult[] = [];
  suggestionIndex: number = -1;
  searchTimeout: any;

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

    this.searchTimeout = setTimeout(async () => {
      if (value) {
        this.suggestions = await this.geosearchSvc.search(value);
      } else {
        this.suggestions = [];
      }
    }, 300);
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyActions: { [key: string]: () => void } = {
      ArrowDown: () => {
        this.suggestionIndex =
          (this.suggestionIndex + 1) % this.suggestions.length;
        this.focusSuggestion();
      },
      ArrowUp: () => {
        this.suggestionIndex =
          (this.suggestionIndex > 0
            ? this.suggestionIndex
            : this.suggestions.length) - 1;
        this.focusSuggestion();
      },
      Enter: () => {
        if (
          this.suggestionIndex >= 0 &&
          this.suggestionIndex < this.suggestions.length
        ) {
          this.selectAddress(this.suggestions[this.suggestionIndex]);
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
            this.suggestions[this.suggestionIndex]
          );
        }
      });
    }
  }

  selectAddress(suggestion: SearchResult): void {
    this.address = suggestion.label;
    this.suggestions = [];
    this.suggestionIndex = -1;
    if (this.searchBarRef && this.searchBarRef.nativeElement) {
      this.searchBarRef.nativeElement.setFocus();
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.address.trim()) return;
    console.log('Submit:', this.address);
  }
}
