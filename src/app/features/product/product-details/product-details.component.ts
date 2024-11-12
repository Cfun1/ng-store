import { AfterViewInit, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { RESOLVER_KEYS } from 'src/app/core/app-routing-keys';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy
{
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog)

  dialogRef!: MatDialogRef<any, any>;
  dialogClosedSub!: Subscription;

  product$!: Observable<Product>;

  @ViewChild('productDetails') productDetailsRef!: TemplateRef<any>;

  constructor() { }

  ngOnInit()
  {
    this.product$ = this.activatedRoute.data.pipe(map(data => data[RESOLVER_KEYS.PRODUCT_DATA]));
  }

  ngAfterViewInit()
  {
    this.showProductDetails();
  }

  ngOnDestroy(): void
  {
    this.dialogClosedSub.unsubscribe();
  }

  showProductDetails()
  {
    this.dialogRef = this.dialog.open(this.productDetailsRef, {
      width: DIALOG_CONFIG.width,
      height: DIALOG_CONFIG.height,
      hasBackdrop: true,
    })

    this.dialogClosedSub = this.dialogRef.afterClosed().subscribe(result =>
    {
      if (result === undefined)
      {
        // console.log('Dialog closed by clicking outside the overlay.');
        this.router.navigate(['/home']);
      }

    });
    return;
  }
}

const DIALOG_CONFIG = {
  width: '55vw',
  height: '80vh',
};
