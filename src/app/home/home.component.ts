import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../features/product/product';
import { ProductService } from '../features/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit
{

  constructor(private productservice: ProductService) { }
  products$!: Observable<Product[]>;

  ngOnInit()
  {
    this.products$ = this.productservice.getproducts$();
  }
}
