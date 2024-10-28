import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanLoad
{
  constructor () { }
  canLoad(route: Route,
    segments: UrlSegment[]):
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    throw new Error('Method not implemented.');
  }
}
