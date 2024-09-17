import { Component, computed, effect, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonContent } from '@ionic/angular/standalone';
import { StoreCardComponent } from './components/storeCard/storeCard.component';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { CategoryService } from 'src/app/areas/admin/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';
import { IStoreWithDistance } from 'src/app/areas/store/interfaces/iStoreWithDistance.interface';
import { FiltersComponent } from './components/filters/filters.component';

@Component({
  selector: 'app-store-discovery',
  templateUrl: './storeDiscovery.page.html',
  standalone: true,
  imports: [IonContent, FooterComponent, StoreCardComponent, FiltersComponent],
})
export class StoreDiscoveryPage implements OnInit {
  allCategories = computed(() => this.categorySvc.allCategories());
  filteredStores = computed(() => this.storeSvc.filteredStores());
  address: string | null = null;
  constructor(
    private categorySvc: CategoryService,
    private route: ActivatedRoute,
    private storeSvc: StoreService,
    private geoSearchSvc: GeosearchService
  ) {}

  ngOnInit() {
    // Ottieni l'indirizzo dai parametri della rotta
    this.route.queryParams.subscribe(async (params) => {
      this.address = params['address'] || null;

      if (this.address) {
        // Cerca le coordinate usando GeosearchService
        await this.geoSearchSvc.search(this.address);
      }

      // Carica gli store dopo aver cercato le coordinate
      this.storeSvc.getAllStores();
    });
  }

  onFilterChange(
    key: keyof IStoreWithDistance,
    value: any,
    isChecked: boolean
  ): void {
    if (isChecked) {
      // Aggiungi o aggiorna il filtro
      this.storeSvc.updateFilter(key, value);
    } else {
      // Rimuovi il filtro impostando il valore a null
      this.storeSvc.updateFilter(key, null);
    }
  }
}
