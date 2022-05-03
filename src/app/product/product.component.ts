import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      const id = param['categoryId'];
      if (id) {
        this.getProductsByCategoryId(Number(id));
      } else {
        this.getProductList();
      }
    });
    this.getProductList();
  }
  getProductList() {
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.productList = response;
      },
    });
  }
  private getProductsByCategoryId(id: number) {
    this.productService.getProductsByCategoryId(id).subscribe({
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
