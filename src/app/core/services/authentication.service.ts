import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  isLoggedIn$(): Observable<boolean>
  {
    return this.isAuthenticated$.asObservable();
  }

  login(user: User)
  {
    this.userService.getUsers$().subscribe(users =>
    {
      if (users.some(u => u.username === user.username && u.password === user.password))
      {
        this.isAuthenticated$.next(true);

        //QUESTION HARI: how to avoid magic string? hard coding
        let nextRoute = this.activeRoute.snapshot.queryParamMap.get('redirectTo');
        if (nextRoute !== null)
          this.router.navigate([nextRoute]);
      }
    });
  }

  logout(user: User)
  {
    this.isAuthenticated$.next(false);
  }
}
