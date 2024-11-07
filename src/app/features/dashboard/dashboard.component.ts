import { ViewportScroller } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { QUERY_PARAMS_KEYS } from 'src/app/core/app-routing-keys';
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
    activatedRoute: inject(ActivatedRoute),
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
    this.checkUserDetailsReqFromQueryParams()
  }

  ngOnDestroy(): void
  {
    this.userDetailsSub?.unsubscribe();
    this.tableDataSourceSub?.unsubscribe();
  }
  // #endregion

  checkUserDetailsReqFromQueryParams()
  {
    this.services.activatedRoute.queryParamMap.pipe(
      filter(params => params !== null && params !== undefined),
      map(params => params.get(QUERY_PARAMS_KEYS.userDetails)),
      filter(userId => !!userId && !isNaN(Number(userId))),
      map(userId => Number(userId)),
      switchMap((userId) => this.services.user.getUser$(userId)),
      tap(user => this.loadUserDetails(user))
    ).subscribe();
  }

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
    //navigate to specific query params url and trigger the rxJS logic
    this.services.router.navigate([], {
      relativeTo: this.services.activatedRoute,
      queryParams: { [QUERY_PARAMS_KEYS.userDetails]: user.id },
    });
  }

  loadUserDetails(user: User)
  {
    this.userDetails.clear();
    let cmpRef = this.userDetails.createComponent(UserDetailsComponent);
    let cmpInstance = cmpRef.instance;
    cmpInstance.user = user;

    this.userDetailsSub = cmpInstance.closeComponent.subscribe(() =>
    {
      cmpRef.destroy();
      //navigate back to dashboard, just url to be consistent
      this.services.router.navigate([], {
        relativeTo: this.services.activatedRoute,
      });
    })

    this.services.scroller.scrollToAnchor('close-detail-component')
  }
}