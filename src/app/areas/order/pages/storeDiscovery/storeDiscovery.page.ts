import { Component, computed, effect, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonContent } from '@ionic/angular/standalone';
import { StoreCardComponent } from './components/storeCard/storeCard.component';
import { StoreService } from 'src/app/areas/store/services/store.service';
import { CategoryService } from 'src/app/areas/admin/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { DistanceService } from 'src/app/library/maps/services/distance.service';
import { GeosearchService } from 'src/app/library/maps/services/geoSearch.service';

@Component({
  selector: 'app-store-discovery',
  templateUrl: './storeDiscovery.page.html',
  standalone: true,
  imports: [IonContent, FooterComponent, StoreCardComponent],
})
export class StoreDiscoveryPage implements OnInit {
  allCategories = computed(() => this.categorySvc.allCategories());
  allStores = computed(() => this.storeSvc.allStores());
  storesWithDistance = computed(() => this.distanceSvc.storesWithDistance());
  address: string | null = null;
  constructor(
    private categorySvc: CategoryService,
    private route: ActivatedRoute,
    private distanceSvc: DistanceService,
    private storeSvc: StoreService,
    private geoSearchSvc: GeosearchService
  ) {
    effect(() => {
      console.log('Stores updated:', this.allStores());
      console.log('Stores with distance updated:', this.storesWithDistance());
    });
  }

  ngOnInit() {
    // Carica gli store
    this.storeSvc.getAllStores();

    // Ottieni l'indirizzo dai parametri della rotta
    this.route.queryParams.subscribe(async (params) => {
      this.address = params['address'] || null;

      if (this.address) {
        // Cerca le coordinate usando GeosearchService
        await this.geoSearchSvc.search(this.address);

        // Calcola le distanze dopo che le coordinate sono state aggiornate
        this.distanceSvc.calculateStoresWithDistance();
      }
    });
  }
}
