import { Component, DoCheck, OnInit } from '@angular/core';
import { CartModel } from '../models/cartModel';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit, DoCheck {
  cartList: CartModel[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartList();
  }

  getCartList() {
    this.cartList = this.cartService.list();
  }

  ngDoCheck(): void {
    this.totalPrice = this.cartList.reduce(
      (a, b) => a + b.product.unitPrice * b.count,
      0
    );
    this.totalCount = this.cartList.reduce((a, b) => a + b.count, 0);
  }
}
