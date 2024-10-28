import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  isLoggedIn$(): Observable<boolean>
  {
    return this.isAuthenticated$.asObservable();
  }

  login(user: User): Observable<boolean>
  {
    this.isAuthenticated$.next(true);
    return this.isAuthenticated$;
  }

  logout(user: User)
  {
    this.isAuthenticated$.next(false);
    return this.isAuthenticated$;
  }
}
