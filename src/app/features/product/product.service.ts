import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
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
  private router = inject(Router);

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product>
  {
    let requestedProdId = Number(route.paramMap.get(PATH_PARAMS_KEYS.productId));
    if (!requestedProdId || isNaN(requestedProdId))
    {
      //      throw new Error('Invalid product ID');
      console.error('Invalid product ID');
      this.router.navigate(['/']);
    }

    return this.http.get<Product[]>(this.apiProductsEndpoint).pipe(
      map(products => products.find(prod => prod.id === requestedProdId)),
      filter((product): product is Product => product !== undefined));
  }

  getProducts$(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiProductsEndpoint);
  }

  addProducts$(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.apiProductsEndpoint, product);
  }
}
