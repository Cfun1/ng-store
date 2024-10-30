import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RESOLVER_KEYS } from 'src/app/core/app-routing-keys';
import { CartItem, CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit
{

  cart$!: Observable<CartItem[]>;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
    //this.cart$ = this.cartService.getCart$();
    this.cart$ = this.activatedRoute.data.pipe(map(data => data[RESOLVER_KEYS.CART_DATA]));
  }
}
