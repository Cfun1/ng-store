import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { PATH_PARAMS_KEYS } from 'src/app/core/app-routing-keys';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<Product>
{
  private apiProductsEndpoint = 'https://fakestoreapi.com/products';
  private http = inject(HttpClient);

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product>
  {
    let requestedProdId = Number(route.paramMap.get(PATH_PARAMS_KEYS.productId));

    return this.http.get<Product[]>(this.apiProductsEndpoint).pipe(
      map(products => products.find(prod => prod.id === requestedProdId)),
      filter((product): product is Product => product !== undefined));
  }

  getproducts$(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiProductsEndpoint);
  }
}
