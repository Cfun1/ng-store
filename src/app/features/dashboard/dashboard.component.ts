import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/Auth/authentication.service';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
  constructor() { }

  /* Dependency Injection*/
  readonly services = {
    user: inject(UserService),
    auth: inject(AuthService),
    router: inject(Router),
  };
  /***/

  users$!: Observable<User[]>;
  currenUser!: User | undefined;
  isLoggedIn$: Observable<boolean> = this.services.auth.isLoggedIn$;

  ngOnInit()
  {
    this.getUsers$();
    this.currenUser = this.services.auth.currentUser;
  }

  logout()
  {
    this.services.auth.logout();
    this.services.router.navigate(['/home']);
  }

  getUsers$()
  {
    this.users$ = this.services.user.getUsers$();
  }
}
