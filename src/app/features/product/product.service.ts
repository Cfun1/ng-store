import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  private apiProductsEndpoint = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getproducts$(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiProductsEndpoint);
  }
}
