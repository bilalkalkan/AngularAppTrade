import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(
        'https://demodata.grapecity.com/northwind/api/v1/Products'
      )
      .pipe(map((response: ProductModel[]) => response));
  }
}
