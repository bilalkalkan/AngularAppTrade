import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { ProductModel } from './models/productModel';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  productList!: ProductModel[];
  addedProduct!: string;
  filteredText!: string;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.productList = response;
      },
    });
  }
  addToCart(product: ProductModel) {
    this.addedProduct = product.productName;
    this.cartService.addToCart(product);
  }
}
