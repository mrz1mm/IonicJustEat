import { Path } from 'src/app/library/utils/Path';
import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ProductResponse } from 'src/app/areas/store/interfaces/ProductResponse.interface';
import { StoreService } from 'src/app/areas/store/services/store.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './productCard.component.html',
  styleUrls: ['./productCard.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    CommonModule,
    RouterModule,
  ],
})
export class ProductCardComponent implements OnInit {
  Path = Path;
  @Input() product: ProductResponse | null = null;

  productId: string | null = null;
  store = computed(() => this.storeSvc.store());

  constructor(private route: ActivatedRoute, private storeSvc: StoreService) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.storeSvc.getStoreById(this.productId);
    }
  }
}
