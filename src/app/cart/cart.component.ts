import { Component, OnInit } from '@angular/core';
import { CartModel } from './models/cartModel';
import { RemoveType } from './models/remove-type';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartList!: CartModel[];
  _removeType = RemoveType;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartList();
  }
  getCartList() {
    this.cartList = this.cartService.list();
  }
  getTotal(cart: CartModel) {
    return cart.count * cart.product.unitPrice;
  }

  getTotalKdv(cart: CartModel) {
    return (
      cart.count *
      (cart.product.unitPrice + (cart.product.unitPrice / 100) * 18)
    );
  }

  removeFromCart(cart: CartModel, removeTtype: RemoveType): void {
    this.cartService.removeFromCart(cart, removeTtype);
  }
}
