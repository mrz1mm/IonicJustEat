import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonIcon,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { fingerPrint, personOutline } from 'ionicons/icons';
import { Path } from 'src/app/library/utils/Path';
import { StoreRequest } from '../../../interfaces/StoreRequest.interface';
import { StoreService } from '../../../services/store.service';
import { GeosearchService } from 'src/app/library/maps/geoSearch.service';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';

@Component({
  selector: 'app-store-form',
  templateUrl: './storeForm.component.html',
  styleUrls: ['./storeForm.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonIcon,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class StoreFormComponent implements OnInit {
  Path = Path;
  storeForm!: FormGroup;
  address: string = '';
  suggestions: SearchResult[] = [];
  suggestionIndex: number = -1;
  searchTimeout: any;
  currentAddress: [];

  @ViewChild('searchBar', { static: true }) searchBarRef!: ElementRef<IonInput>;
  @ViewChildren('suggestionItem', { read: ElementRef })
  suggestionItems!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private geoSearchSvc: GeosearchService,
    private storeSvc: StoreService
  ) {
    addIcons({
      'person-outline': personOutline,
      'finger-print': fingerPrint,
    });
  }

  ngOnInit() {
    this.storeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[A-Za-z\d\S]{6,}$/
          ),
        ],
      ],
    });
  }

  onInputChange(event: any): void {
    const value = event.target.value;
    this.address = value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(async () => {
      if (value) {
        this.suggestions = await this.geoSearchSvc.search(value);
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

  getHelperText(controlName: string): string {
    const control = this.storeForm.get(controlName);
    return control?.touched && control?.valid
      ? `LoginForm.${controlName.toUpperCase()}_VALID`
      : `LoginForm.${controlName.toUpperCase()}_HELPER`;
  }

  getErrorText(controlName: string): string | null {
    const control = this.storeForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return `LoginForm.${controlName.toUpperCase()}_REQUIRED`;
    }
    if (control.errors['email']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }
    if (control.errors['pattern']) {
      return `LoginForm.${controlName.toUpperCase()}_FORMAT`;
    }

    return null;
  }

  addStore(): void {
    if (this.storeForm.valid) {
      const storeRequest: StoreRequest = this.storeForm.value;
      this.storeSvc.addStore(storeRequest);
    }
  }
}
