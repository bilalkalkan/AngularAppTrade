import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageType } from 'src/app/shared/enum/local-storage-type.enum';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  getProduct(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl + 'Products').pipe(
      map((response: ProductModel[]) => {
        this.localStorage.setItem(LocalStorageType.products, response);
        return response;
      })
    );
  }

  getProductById(id: number): ProductModel {
    const products = this.getProductLocalStorage(0);
    const product = products.find((x) => x.productId === id);
    return product;
  }

  getProductLocalStorage(id: number): ProductModel[] {
    const data = this.localStorage.getItem(
      LocalStorageType.products
    ) as ProductModel[];
    if (data) {
      if (id > 0) {
        return data.filter((x) => x.categoryId === id);
      }
      return data;
    }
    return [];
  }

  addProduct(model: ProductModel): boolean {
    debugger;
    //this.http.post(`Ş{this.apiUrl}AddProduct`, model);
    const data = this.localStorage.getItem(
      LocalStorageType.products
    ) as ProductModel[];
    if (data) {
      const lastProduct = data[data.length - 1];
      model.productId = lastProduct.productId + 1;
      data.push(model);
      return this.localStorage.setItem(LocalStorageType.products, data);
    }
    return false;
  }

  saveProduct(model: ProductModel): boolean {
    const data = this.localStorage.getItem(
      LocalStorageType.products
    ) as ProductModel[];
  }
}
