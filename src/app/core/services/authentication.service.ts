import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { QUERY_PARAMS } from './auth-guard.service';

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

  login(user: User)
  {
    this.userService.getUsers$().subscribe(users =>
    {
      if (users.some(u => u.username === user.username && u.password === user.password))
      {
        this.isAuthenticated$.next(true);
        this.currentUser = user;
        //QUESTION: better way to avoid magic string/ hard coding?
        let nextRoute = this.activeRoute.snapshot.queryParamMap.get(QUERY_PARAMS.REDIRECT_TO);
        if (nextRoute !== null)
          this.router.navigate([nextRoute]);
      }
    });

    //is it necessary to unsubscribe somehow ? using rxjs operators approach made the code much larger
  }

  logout()
  {
    this.currentUser = undefined;
    this.isAuthenticated$.next(false);
    this.router.navigate(['/home']);
  }
}
