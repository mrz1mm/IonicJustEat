import { Component, computed } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [],
})
export class CartComponent {
  cart = computed(() => this.cartSvc.cart());

  constructor(private cartSvc: CartService) {}
}
