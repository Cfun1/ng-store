import { ViewportScroller } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/Auth/authentication.service';
import { User } from 'src/app/features/user/user';
import { UserService } from 'src/app/features/user/user.service';
import { UserDetailsComponent } from '../user/user-details/user-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy
{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('userDetails', { read: ViewContainerRef }) userDetails!: ViewContainerRef;

  // #region DI
  readonly services = {
    user: inject(UserService),
    auth: inject(AuthService),
    router: inject(Router),
    viewContainerRef: inject(ViewContainerRef),
    scroller: inject(ViewportScroller),
  };
  // #endregion

  users$!: Observable<User[]>;
  currenUser!: User | undefined;
  isLoggedIn$: Observable<boolean> = this.services.auth.isLoggedIn$;

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'email', 'phone'];
  userDetailsSub!: Subscription;
  tableDataSourceSub!: Subscription;

  // #region Life cycle Hooks
  ngOnInit()
  {
    this.getUsers$();
    this.currenUser = this.services.auth.currentUser;
  }

  ngAfterViewInit()
  {
    this.initMatTable();
  }

  ngOnDestroy(): void
  {
    this.userDetailsSub?.unsubscribe();
    this.tableDataSourceSub?.unsubscribe();
  }
  // #endregion


  initMatTable()
  {
    this.tableDataSourceSub = this.users$.subscribe(users =>
    {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    })
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

  showUserDetails(user: User)
  {
    this.userDetails.clear();
    let cmpRef = this.userDetails.createComponent(UserDetailsComponent);
    let cmpInstance = cmpRef.instance;
    this.userDetailsSub = cmpInstance.closeComponent.subscribe(() => cmpRef.destroy())
    cmpInstance.user = user;

    this.services.scroller.scrollToAnchor('close-detail-component')
  }
}