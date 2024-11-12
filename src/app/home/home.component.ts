import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../core/services/Auth/authentication.service';
import { CartItem, CartService } from '../features/cart/cart.service';
import { Product } from '../features/product/product';
import { ProductService } from '../features/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit
{

  /* Dependency Injection*/
  readonly services = {
    cart: inject(CartService),
    product: inject(ProductService),
    auth: inject(AuthService),
    snackBar: inject(MatSnackBar),
    router: inject(Router),
  };
  /***/

  products$!: Observable<Product[]>;
  isLoggedIn$: Observable<boolean> = this.services.auth.isLoggedIn$;
  cartCount$!: Observable<number>;
  isCartEmpty$: Observable<boolean> = of(true);

  constructor() { }

  //#region life cycle hooks
  ngOnInit()
  {
    this.loadProducts();
    this.cartCount$ = this.services.cart.getCartCount$();
    this.isCartEmpty$ = this.services.cart.isCartEmpty$();
  }
  //#endregion

  loadProducts()
  {
    this.products$ = this.services.product.getProducts$();
  }

  goToCart()
  {
    this.services.router.navigate(['/cart']);
  }

  addToCart(product: Product)
  {
    this.services.cart.addProduct({ product: product, quantity: 1 } as CartItem);
    this.services.snackBar.open(`Item added to cart`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  addProductClicked()
  {
    this.services.router.navigate(['/addProduct']);
  }
}
