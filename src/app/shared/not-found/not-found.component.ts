import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  customMessage: string = 'default';
  requestedUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.customMessage = this.activatedRoute.snapshot.data['message'];
  }

  ngOnInit() {
    this.requestedUrl = this.router.url;
  }
}
