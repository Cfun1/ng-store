import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/authentication.service';
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

  logout() { this.services.auth.logout(); }

  getUsers$()
  {
    this.users$ = this.services.user.getUsers$();
  }
}
