import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleStrategyManagerService extends TitleStrategy
{

  constructor(private titleService: Title, private titleCase: TitleCasePipe)
  {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void
  {
    const componentTitle = this.buildTitle(routerState);
    if (componentTitle)
    {
      this.titleService.setTitle(this.titleCase.transform(componentTitle));
    }
  }
}
