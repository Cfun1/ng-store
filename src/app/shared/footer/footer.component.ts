import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit
{
  scroller = inject(ViewportScroller);

  scrollToTop()
  {
    this.scroller.scrollToPosition([0, 0]);
  }
  //  private ngZone = inject(NgZone);

  currentPosition$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  showGoToTop: boolean = false;

  sub!: Subscription;

  // listenToScroll()
  // {
  //   fromEvent(window, 'scroll')
  //     .pipe(
  //       throttleTime(500),
  //       filter((val) => this.isScollToBottom())
  //     ).subscribe(() => this.scrollEnds$.next())
  // }

  // isScollToBottom(): boolean
  // {
  //   if (this.currentPosition > 50)
  //     return true;
  //   else
  //     return false;
  // }

  constructor() { }


  //Optimizaton required! it triggers the change detection a lot: tried ChangeDetectionStrategy.OnPush & runOutsideAngular withotu sucess the progress bar must be in sync, any thoughts ?

  ngOnInit(): void
  {
    //this.ngZone.runOutsideAngular(() =>
    //{
    this.sub = fromEvent(window, 'scroll').pipe(
      // debounceTime(50),
      tap(_ =>
      {
        const scrollPositionPercent = this.getScrollPercent();
        this.currentPosition$.next(scrollPositionPercent);
        if (this.currentPosition$?.value > 70)
          this.showGoToTop = true;
        else
          this.showGoToTop = false;
      }),
    ).subscribe();
    //})
  }

  getScrollPercent(): number
  {
    return Math.floor((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
  }

  ngOnDestroy()
  {
    this.sub?.unsubscribe();
  }

  ngAfterViewChecked()
  {
    //console.log('Change detection triggered! from footer', this.showGoToTop);
  }

  /* Previous approach */
  // @HostListener('window:scroll', ['$event'])
  // onContentScrolled(e: any)
  // {
  //   const totalScrollableHeight =
  //     document.documentElement.scrollHeight - window.innerHeight;
  //   const scrollPositionPercent =
  //     (window.scrollY / totalScrollableHeight) * 100;

  //   this.currentPosition = scrollPositionPercent;
  //   const scroll = window.scrollY;

  //   if (scroll > this.currentPosition)
  //   {
  //     //console.log('scrollDown');
  //   } else
  //   {
  //     //console.log('scrollUp ');
  //   }
  // }
}