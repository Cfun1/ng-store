import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit
{
  customMessage: string = 'default';
  requestedUrl!: string;

  /* Dependency Injection*/
  readonly services = {
    router: inject(Router),
    activatedRoute: inject(ActivatedRoute),
  };
  /***/

  constructor()
  {
    this.customMessage = this.services.activatedRoute.snapshot.data['message'];
  }

  ngOnInit()
  {
    this.requestedUrl = this.services.router.url;
  }
}
