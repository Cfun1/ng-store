import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  constructor(private authService: AuthService) { }

  isLoggedIn$!: Observable<boolean>;

  ngOnInit()
  {
    this.isLoggedIn$ = this.authService.isLoggedIn$();
  }

  login(form: NgForm)
  {
    let u = new User("userName", "pass");

    this.authService.login(u);
  }

  logout(form: NgForm)
  {
    let u = new User("userName", "pass");
    this.authService.logout(u);
  }
}
