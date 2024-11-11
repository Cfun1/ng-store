import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  private cartItems: CartItem[] = []; // Local storage for cart items

  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartCount$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CartItem[] | Observable<CartItem[]> | Promise<CartItem[]>
  {
    return this.getCart$();
  }

  getCart$(): Observable<CartItem[]>
  {
    return this.cart$.asObservable();
  }

  getCartCount$(): Observable<number>
  {
    return this.cartCount$.asObservable();
  }

  isCartEmpty$(): Observable<boolean>
  {
    return this.cartCount$.pipe(map(count => (count === 0)));
  }

  addProduct(item: CartItem): void
  {
    const existingItem = this.cartItems.find(i => i.product.id === item.product.id);
    if (existingItem)
    {
      existingItem.quantity += item.quantity;
    } else
    {
      this.cartItems.push(item);
    }
    this.updateCartState();
  }

  removeFromCart(item: CartItem)
  {
    const index = this.cartItems.findIndex(i => i.product.id === item.product.id);
    if (index !== -1)
    {
      console.log(this.cartItems);

      this.cartItems.splice(index, 1);
      console.log(this.cartItems);

    }
    this.updateCartState();
  }

  updateCartItem(itemId: number, quantity: number): void
  {
    const itemIndex = this.cartItems.findIndex(i => i.product.id === itemId);
    if (itemIndex !== -1)
    {
      this.cartItems[itemIndex].quantity = quantity;
    }
    this.updateCartState();
  }

  private updateCartState(): void
  {
    this.cart$.next([...this.cartItems]);
    this.cartCount$.next(this.cartItems.length);
  }
}