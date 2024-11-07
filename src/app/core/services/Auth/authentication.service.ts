import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, of, switchMap, tap } from 'rxjs';
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

  login(user: User): Observable<string | undefined>
  {
    return this.userService.getUsers$()
      .pipe(
        tap(val => console.log(' execute the api call ')),
        delay(500),//mock delay of api call
        switchMap(users =>
        {
          let foundUser = users.find(u => u.username === user.username && u.password === user.password)
          if (foundUser)
          {
            this.currentUser = foundUser;

            this.isAuthenticated$.next(true);

            if (this.nextRoute$.value !== null)
              return this.nextRoute$.asObservable();
            return of();
          }
          return of();
        })
      );
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
