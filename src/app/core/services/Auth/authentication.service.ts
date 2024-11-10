import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { User } from '../../../features/user/user';
import { UserService } from '../../../features/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isAuthenticated$.asObservable();
  currentUser!: User | undefined;
  private nextRoute$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  login(user: User): Observable<LoginReturns>
  {
    return this.userService.getUsers$()
      .pipe(
        tap(val => console.log(' execute the api call ')),
        delay(500),       //mock delay of api call
        map(users =>
        {
          const foundUser = users.find(u => u.username === user.username)
          if (!foundUser)
          {
            return {
              success: false,
              errors: [LOGIN_ERRORS.UserNotFound],
              nextRoute: null
            } as LoginReturns;
          }

          if (foundUser.password !== user.password)
          {
            return {
              success: false,
              errors: [LOGIN_ERRORS.WrongPassword],
              nextRoute: null
            } as LoginReturns;
          }

          this.currentUser = foundUser;
          this.isAuthenticated$.next(true);
          return {
            success: true,
            errors: [],
            nextRoute: this.nextRoute$.value ? this.nextRoute$.value : null
          } as LoginReturns;
        }))
  }

  logout()
  {
    this.currentUser = undefined;
    this.isAuthenticated$.next(false);
  }

  setRedirectUrl(url: string)
  {
    this.nextRoute$.next(url);
  }
}

export interface LoginReturns
{
  success: boolean,
  errors: ValidationErrors[],
  nextRoute: string | null
}

export const LOGIN_ERRORS = {
  UserNotFound: { key: 'UserNotFound', message: 'User does not exist.' } as ValidationErrors,
  WrongPassword: { key: 'WrongPassword', message: 'Invalid password.' } as ValidationErrors,
};
