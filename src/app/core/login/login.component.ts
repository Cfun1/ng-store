import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthService } from '../services/Auth/authentication.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy
{
  /* Dependency injection */
  authService = inject(AuthService);
  router = inject(Router);

  constructor() { }


  isLoggedIn$!: Observable<boolean>;
  nextRoute$!: Observable<string | undefined>;
  nextRouteSub!: Subscription;

  readonly initUserName: string = 'johnd';
  readonly initPassword: string = 'm38rmF$';

  ngOnInit()
  {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  login(username: string, password: string)
  {
    let user: User = { username: username, password: password } as User;
    this.nextRoute$ = this.authService.login(user); //mockUser);
    this.nextRouteSub = this.nextRoute$.pipe(
      tap(
        nextRoute =>
        {
          if (nextRoute)
            this.router.navigate([nextRoute]);
        }
      )
    ).subscribe();
  }

  logout(form: NgForm)
  {
    this.authService.logout();
  }

  ngOnDestroy(): void
  {
    this.nextRouteSub?.unsubscribe();
  }
}
