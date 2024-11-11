import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { RESOLVER_KEYS } from 'src/app/core/app-routing-keys';
import { CartItem, CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit
{
  constructor()
  {
  }

  //#region DI
  readonly services = {
    activatedRoute: inject(ActivatedRoute),
    cart: inject(CartService)
  };
  //#endregion

  cart$!: Observable<CartItem[]>;
  totalPrice: number = 0;

  ngOnInit()
  {
    //from resolver
    this.cart$ = this.services.activatedRoute.data.pipe(
      map(data => data[RESOLVER_KEYS.CART_DATA])
    );

    this.cart$ = this.services.cart.getCart$();
    this.cart$.pipe(
      tap((items) =>
      {
        this.totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      }),
      tap((items) => console.log(items.length))
    ).subscribe();
  }

  increaseQuantity(item: CartItem): void
  {
    this.services.cart.updateCartItem(item.product.id, ++item.quantity);
  }

  decreaseQuantity(item: CartItem): void
  {
    if (item.quantity > 1)
    {
      this.services.cart.updateCartItem(item.product.id, --item.quantity)
    }
    else
    {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: CartItem): void
  {
    this.services.cart.removeFromCart(item);
  }
}
