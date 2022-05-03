import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProduct(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.apiUrl + 'Products')
      .pipe(map((response: ProductModel[]) => response));
  }

  getProductsByCategoryId(id: number): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.apiUrl + 'Categories/' + id + '/Products')
      .pipe(map((response: ProductModel[]) => response));
    // https://demodata.grapecity.com/northwind/api/v1/Categories/1/Products
  }
}
