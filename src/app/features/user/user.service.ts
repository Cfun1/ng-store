import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private apiUsersEndpoint = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  getUsers$(): Observable<User[]>
  {
    return this.http.get<User[]>(this.apiUsersEndpoint)
      .pipe(
        retry({ count: 3, delay: 1500 }),
        catchError(err =>
        {
          let error = err as HttpErrorResponse;
          console.error('API call failed after retries: ', error);
          return throwError(() => new Error('Sorry, we couldn’t complete your request. Please try again later.'));
        })
      );
  }
}
