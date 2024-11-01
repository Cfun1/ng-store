import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RESOLVER_KEYS } from 'src/app/core/app-routing-keys';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit
{
  private activatedRoute = inject(ActivatedRoute);
  product$!: Observable<Product>;

  constructor() { }

  ngOnInit()
  {
    this.product$ = this.activatedRoute.data.pipe(map(data => data[RESOLVER_KEYS.PRODUCT_DATA]));
  }
}
