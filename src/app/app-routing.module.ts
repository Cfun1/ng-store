import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RESOLVER_KEYS } from './core/app-routing-keys';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { CartComponent } from './features/cart/cart.component';
import { CartService } from './features/cart/cart.service';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },

  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'cart', component: CartComponent, title: 'Cart', resolve: { [RESOLVER_KEYS.CART_DATA]: CartService } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, title: 'Login' },

  {
    path: '**',
    component: NotFoundComponent,
    data: { message: "Sorry, this page doesn't exist!" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
