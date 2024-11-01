import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CartComponent } from '../features/cart/cart.component';
import { AddProductComponent } from '../features/product/add-product/add-product.component';
import { ProductDetailsComponent } from '../features/product/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [HomeComponent, CartComponent, ProductDetailsComponent, AddProductComponent],
  exports: [],
})
export class HomeModule { }
