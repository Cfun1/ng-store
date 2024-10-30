import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RESOLVER_KEYS } from 'src/app/core/app-routing-keys';
import { CartItem } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit
{
  constructor() { }

  /* Dependency Injection*/
  readonly services = {
    activatedRoute: inject(ActivatedRoute)
  };
  /***/

  cart$!: Observable<CartItem[]>;

  ngOnInit()
  {
    //this.cart$ = this.cartService.getCart$();
    this.cart$ = this.services.activatedRoute.data.pipe(map(data => data[RESOLVER_KEYS.CART_DATA]));
  }
}
