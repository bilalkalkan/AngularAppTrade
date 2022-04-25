import { Component, OnInit } from '@angular/core';
import { CartModel } from './models/cartModel';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList!: CartModel[];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartList = this.cartService.list();
  }
}
