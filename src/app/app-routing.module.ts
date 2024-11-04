import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_PARAMS_KEYS, RESOLVER_KEYS } from './core/app-routing-keys';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './core/services/Auth/auth-guard.service';
import { CartComponent } from './features/cart/cart.component';
import { CartService } from './features/cart/cart.service';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddProductComponent } from './features/product/add-product/add-product.component';
import { ProductDetailsComponent } from './features/product/product-details/product-details.component';
import { ProductService } from './features/product/product.service';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    children: [
      {
        path: `product/:${PATH_PARAMS_KEYS.productId}`,
        //loadComponent: () => import('./features/product/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
        title: "Product details",
        component: ProductDetailsComponent,
        resolve: { [RESOLVER_KEYS.PRODUCT_DATA]: ProductService }
      },
    ]
  },

  {
    path: 'addProduct',
    title: "Add product",
    //loadComponent: () => import('./features/product/add-product/add-product.component').then((m) => m.AddProductComponent),
    component: AddProductComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
    resolve: { [RESOLVER_KEYS.CART_DATA]: CartService }
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },

  {
    path: '**',
    component: NotFoundComponent,
    data: { message: "Sorry, this page doesn't exist!" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
