/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './authentication.service';

describe('Service: Authentication', () =>
{
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) =>
  {
    expect(service).toBeTruthy();
  }));
});
