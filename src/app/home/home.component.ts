import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/authentication.service';
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
  constructor(private productservice: ProductService, private authService: AuthService
    , private cartService: CartService, private snackBar: MatSnackBar, private router: Router) { }

  products$!: Observable<Product[]>;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  cartCount$!: Observable<number>;


  ngOnInit()
  {
    this.loadProducts();
    this.cartCount$ = this.cartService.getCartCount$();
  }


  loadProducts()
  {
    this.products$ = this.productservice.getproducts$();
  }

  goToCart()
  {
    this.router.navigate(['/cart']);
  }

  addToCart(product: Product)
  {
    this.cartService.addProduct({ product: product, quantity: 1 } as CartItem);
    this.snackBar.open(`Item added to cart`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
