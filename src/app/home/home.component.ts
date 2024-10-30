import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    , private cartService: CartService, private snackBar: MatSnackBar) { }

  products$!: Observable<Product[]>;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  ngOnInit()
  {
    this.loadProducts();
  }


  loadProducts()
  {
    this.products$ = this.productservice.getproducts$();
  }

  addToCart(product: Product)
  {
    this.cartService.addProduct({ product: product, quantity: 1 } as CartItem);
    this.snackBar.open(`Item added to cart`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
