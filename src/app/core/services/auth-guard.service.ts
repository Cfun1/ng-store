import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate
{
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.authService.isLoggedIn$().pipe<boolean>(
      map((isLoggedIn) =>
      {
        if (isLoggedIn)
          return true; // Allow access

        this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } as RedirectToQueryParams }); // Redirect to login
        return false; // Deny access to satisfy the compiler
      })
    );
  }
}

export interface RedirectToQueryParams
{
  redirectTo: string;
}
