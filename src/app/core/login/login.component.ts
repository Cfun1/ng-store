import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  /* Dependency injection */
  authService = inject(AuthService);

  constructor() { }

  isLoggedIn$!: Observable<boolean>;
  readonly initUserName: string = 'johnd';
  readonly initPassword: string = 'm38rmF$';

  ngOnInit()
  {
    this.isLoggedIn$ = this.authService.isLoggedIn$;


  }

  login(username: string, password: string)
  {
    ////    fromEvent()         exhaustMap(users => of(users)),
    let user: User = { username: username, password: password } as User;
    this.authService.login(user); //mockUser);
  }

  logout(form: NgForm)
  {
    this.authService.logout();
  }
}
