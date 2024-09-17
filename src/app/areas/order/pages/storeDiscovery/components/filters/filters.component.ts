import { CategoryService } from './../../../../../admin/service/category.service';
import { Component, computed, signal } from '@angular/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import {
  IonContent,
  IonInput,
  IonItem,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/angular/standalone';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { IStoreWithDistance } from 'src/app/areas/store/interfaces/iStoreWithDistance.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  standalone: true,
  imports: [
    IonLabel,
    IonRange,
    IonItem,
    IonInput,
    IonContent,
    FooterComponent,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class FiltersComponent {
  protected _selectedDistance = signal<number>(20);
  protected _selectedCategories = signal<string[]>([]);
  protected _searchValue = signal<string>('');

  allCategories = computed(() => this.categorySvc.allCategories());
  filteredStores = computed(() => this.storeSvc.filteredStores());
  filterCriteria = computed(() => this.storeSvc.filterCriteria());

  constructor(
    private categorySvc: CategoryService,
    private storeSvc: StoreService
  ) {}

  // Metodo per gestire il cambio del filtro distanza
  onDistanceChange(event: any): void {
    const distance = event.detail.value;
    this._selectedDistance.set(distance);
    this.storeSvc.setFilterCriteria('distance', distance);
  }

  // Metodo per gestire il cambio delle categorie
  onCategoryChange(event: any): void {
    const categories = event.detail.value;
    this._selectedCategories.set(categories);
    this.storeSvc.setFilterCriteria('categories', categories);
  }

  // Metodo per gestire la ricerca
  onSearchChange(event: any): void {
    const searchValue = event.target.value.trim().toLowerCase();
    this._searchValue.set(searchValue);
    this.storeSvc.setFilterCriteria('storeName', searchValue);
  }
}
