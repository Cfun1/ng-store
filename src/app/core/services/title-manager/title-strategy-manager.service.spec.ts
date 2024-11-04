/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TitleStrategyManagerService } from './title-strategy-manager.service';

describe('Service: TitleStrategyManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleStrategyManagerService]
    });
  });

  it('should ...', inject([TitleStrategyManagerService], (service: TitleStrategyManagerService) => {
    expect(service).toBeTruthy();
  }));
});
