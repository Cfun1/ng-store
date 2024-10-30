import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { mockUser } from '../user/user';

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

  ngOnInit()
  {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  login(form: NgForm)
  {
    this.authService.login(mockUser);
  }

  logout(form: NgForm)
  {
    this.authService.logout();
  }
}
