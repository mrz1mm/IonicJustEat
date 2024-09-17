import { Component, computed, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  standalone: true,
  imports: [IonContent, IonContent, FooterComponent],
})
export class StorePage implements OnInit {
  storeId: string | null = null;
  store = computed(() => this.storeSvc.store());

  constructor(private route: ActivatedRoute, private storeSvc: StoreService) {}

  ngOnInit() {
    this.storeId = this.route.snapshot.paramMap.get('id');

    if (this.storeId) {
      this.storeSvc.getStoreById(this.storeId);
    }
  }
}
