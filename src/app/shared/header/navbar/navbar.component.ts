import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/Auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit
{
  @Input() title!: string;

  authUser$: Subject<string> = new Subject();
  authUserSub!: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit()
  {
    this.authUserSub = this.auth.isLoggedIn$.pipe()
      .subscribe((val) => this.authUser$?.next(val && this.auth.currentUser ? this.auth.currentUser.name.firstname : ''))
  }

  ngOnDestroy()
  {
    this.authUserSub.unsubscribe();
  }
}
