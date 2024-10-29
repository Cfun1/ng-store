import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/authentication.service';
import { Product } from '../features/product/product';
import { ProductService } from '../features/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit
{

  constructor(private productservice: ProductService, private authService: AuthService) { }
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
}
