import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/product/models/productModel';
import { CART_ITEMS } from '../models/cart-item.const';
import { CartModel } from '../models/cartModel';
import { RemoveType } from '../models/remove-type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: ProductModel) {
    const data = CART_ITEMS.find(
      (item) => item.product.productId === product.productId
    );
    if (data) {
      data.count++;
      return;
    }
    const model = new CartModel();
    model.count = 1;
    model.product = product;
    CART_ITEMS.push(model);
    console.log('CART_ITEMS: ', CART_ITEMS);
  }
  list(): CartModel[] {
    return CART_ITEMS;
  }

  removeFromCart(cart: CartModel, removeTtype: RemoveType): void {
    const data = CART_ITEMS.find(
      (item) => item.product.productId === cart.product.productId
    );
    if (data) {
      if (data.count > 1 && removeTtype === RemoveType.single) {
        data.count--;
        return;
      }
      const index = CART_ITEMS.indexOf(data);
      if (index > -1) {
        CART_ITEMS.splice(index, 1);
      }
    }
  }
}
