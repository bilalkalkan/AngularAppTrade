import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/product/models/productModel';
import { CART_ITEMS } from '../models/cart-item.const';
import { CartModel } from '../models/cartModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: ProductModel) {
    debugger;
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
}
