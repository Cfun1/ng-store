import { Component, OnInit } from '@angular/core';
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
  users$!: Observable<User[]>;
  currenUser!: User | undefined;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit()
  {
    this.getUsers$();
    this.currenUser = this.authService.currentUser;
  }

  logout() { this.authService.logout(); }

  getUsers$()
  {
    this.users$ = this.userService.getUsers$();
  }
}
