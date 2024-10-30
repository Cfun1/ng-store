import { Injectable } from '@angular/core';
import { Product } from '../product/product';


export interface CartItem
{
  product: Product,
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService
{
  cart: CartItem[] = [];

  constructor() { }

  addProduct(item: CartItem)
  {
    let itemInCart = this.cart.find(i => i.product.id === item.product.id);
    if (!itemInCart)
    {
      this.cart.push(item);
    }
    else
    {
      itemInCart.quantity += item.quantity;
    }
    console.log(this.cart);
  }

  removeFromCart(item: CartItem)
  {
    const index = this.cart.findIndex(i => i.product.id === item.product.id);
    if (index !== -1)
    {
      this.cart.splice(index, 1);
    }
  }
}
