import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, of, switchMap, tap } from 'rxjs';
import { QUERY_PARAMS_KEYS } from '../app-routing-keys';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isAuthenticated$.asObservable();
  currentUser!: User | undefined;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  login(user: User): Observable<string | undefined>
  {
    return this.userService.getUsers$()
      .pipe(
        tap(val => console.log(' execute the api call ')),
        delay(1000),//mock delay of api call
        switchMap(users =>
        {
          let foundUser = users.find(u => u.username === user.username && u.password === user.password)
          if (foundUser)
          {
            this.isAuthenticated$.next(true);
            this.currentUser = foundUser;
            let nextRoute = this.activeRoute.snapshot.queryParamMap.get(QUERY_PARAMS_KEYS.REDIRECT_TO);

            if (nextRoute !== null)
              return of(nextRoute);
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
    this.router.navigate(['/home']);
  }
}
