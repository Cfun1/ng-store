import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { User } from '../../features/user/user';
import { AuthService, LOGIN_ERRORS, LoginReturns } from '../services/Auth/authentication.service';
import { ValidationService } from '../services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ValidationService
  implements OnInit, OnDestroy
{
  //#region DI
  authService = inject(AuthService);
  router = inject(Router);
  //#endregion

  loginForm = new FormGroup({
    username: new FormControl('johnd', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('m38rmF$', [Validators.required, Validators.minLength(1)])
  });

  isLogging: boolean = false;
  loginErrors = LOGIN_ERRORS;

  isLoggedIn$!: Observable<boolean>;
  nextRoute$!: Observable<string | undefined>;
  loginSub!: Subscription;

  //#region life cycle Hooks
  constructor()
  {
    super();
  }

  ngOnInit()
  {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy(): void
  {
    this.loginSub?.unsubscribe();
  }
  //#endregion


  onSubmit(): void
  {
    if (this.loginForm.valid)
    {
      const { username, password } = this.loginForm.value;
      this.login(username!, password!);
    }
  }

  private setFormErrors(errors: ValidationErrors[])
  {
    errors.forEach(error =>
    {
      console.log(LOGIN_ERRORS.UserNotFound['key'])
      // Check each error and set corresponding form control errors
      if (error['key'] === LOGIN_ERRORS.UserNotFound['key'])
      {
        this.loginForm.get('username')?.setErrors({ [LOGIN_ERRORS.UserNotFound['key']]: error['message'] });
      }
      else if (error['key'] === LOGIN_ERRORS.WrongPassword['key'])
      {
        this.loginForm.get('password')?.setErrors({ [LOGIN_ERRORS.WrongPassword['key']]: error['message'] });
      }
    });
  }

  login(username: string, password: string)
  {
    this.isLogging = true;

    let user: User = { username: username, password: password } as User;
    this.loginSub = this.authService.login(user).pipe(
      tap((loginStatus: LoginReturns) =>
      {
        this.isLogging = false;

        if (!loginStatus.success)
        {
          this.setFormErrors(loginStatus.errors);
        }
        else if (loginStatus.nextRoute)
        {
          //fixed: use of navigateByUrl instead of navigate, since nextRoute could bundles path + query params
          this.router.navigateByUrl(loginStatus.nextRoute);
        }
      })
    ).subscribe();
  }

  logout()
  {
    this.authService.logout();
    this.loginSub?.unsubscribe();
  }
}
