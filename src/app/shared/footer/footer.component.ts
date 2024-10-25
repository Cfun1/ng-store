import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentPosition: number = 0;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onContentScrolled(e: any) {
    const totalScrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPositionPercent =
      (window.scrollY / totalScrollableHeight) * 100;

    this.currentPosition = scrollPositionPercent;
    const scroll = window.scrollY;

    if (scroll > this.currentPosition) {
      //console.log('scrollDown');
    } else {
      //console.log('scrollUp ');
    }
  }
}
