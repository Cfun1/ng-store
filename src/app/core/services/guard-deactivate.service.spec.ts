/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GuardDeactivateService } from './guard-deactivate.service';

describe('Service: CanDeactivateGuardService', () =>
{
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers: [GuardDeactivateService]
    });
  });

  it('should ...', inject([GuardDeactivateService], (service: GuardDeactivateService) =>
  {
    expect(service).toBeTruthy();
  }));
});
