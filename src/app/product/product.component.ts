import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { CategoryService } from '../category/services/category.service';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      const id = param['categoryId'];
      this.getProductList(Number(id) || 0);
    });
  }
  getProductList(id: number) {
    this.productList = this.productService.getProductLocalStorage(id);
    if (!this.productList || !this.productList.length) {
      this.productService.getProduct().subscribe({
        next: (response) => {
          this.productList = response;
        },
      });
    }
  }

  addToCart(product: ProductModel) {
    this.addedProduct = product.productName;
    this.cartService.addToCart(product);
  }

  onRedirectAddProductPage() {
    this.router.navigate(['/product']);
  }
}
