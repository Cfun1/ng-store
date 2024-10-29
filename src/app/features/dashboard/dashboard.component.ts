import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private userService: UserService) { }

  ngOnInit()
  {
    this.getUsers$();
  }

  getUsers$()
  {
    this.users$ = this.userService.getUsers$();
  }
}
