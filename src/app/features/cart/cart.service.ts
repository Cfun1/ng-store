import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../product/product';


export interface CartItem
{
  product: Product,
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements Resolve<CartItem[]>
{
  cart: CartItem[] = [];
  cartCount$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CartItem[] | Observable<CartItem[]> | Promise<CartItem[]>
  {
    return this.getCart$();
  }

  getCart$(): Observable<CartItem[]>
  {
    return of(this.cart);
  }

  getCartCount$(): Observable<number>
  {
    return this.cartCount$.asObservable();
  }

  addProduct(item: CartItem)
  {
    let itemInCart = this.cart.find(i => i.product.id === item.product.id);
    if (!itemInCart)
    {
      this.cart.push(item);
      this.cartCount$.next(this.cartCount$.value + 1);
    }
    else
    {
      itemInCart.quantity += item.quantity;
    }
  }

  removeFromCart(item: CartItem)
  {
    const index = this.cart.findIndex(i => i.product.id === item.product.id);
    if (index !== -1)
    {
      this.cart.splice(index, 1);
      this.cartCount$.next(this.cartCount$.value - 1);
    }
  }
}
