import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/core/services/guard-deactivate.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import { ConfirmDialogData, confirmDialogTemplateComponent } from 'src/app/shared/confirm-dialog-template.component';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, CanComponentDeactivate
{
  //#region DI
  private services = {
    //fb: inject(FormBuilder),
    validation: inject(ValidationService),
    product: inject(ProductService),
    dialog: inject(MatDialog),
  }
  //#endregion

  //#region Properties
  productForm!: FormGroup;
  addOnBlur = true;
  categories: string[] = ['general'];
  //#endregion

  constructor()
  {
    this.productForm = new FormGroup({
      titleControl: new FormControl(),
      priceControl: new FormControl(0),
      descriptionControl: new FormControl(),
      categoryControl: new FormControl(this.categories, { validators: this.notEmptyCategoriesValidator }),
      imageControl: new FormControl(),
      rateControl: new FormControl([Validators.min(0), Validators.max(5)]),
      countControl: new FormControl({ validators: Validators.required }),
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean
  {
    if (this?.productForm?.pristine)
      return true;

    let dialogRef = this.services.dialog.open(confirmDialogTemplateComponent, {
      width: '250px',
      hasBackdrop: true,
      data: { caller: "Add product" } as ConfirmDialogData
    })

    return dialogRef.beforeClosed();
  }

  //#region Validators logic
  validateRequired(controlName: string)
  {
    return this.services.validation.validateRequired(this.productForm, controlName);
  }

  validateRange(controlName: string)
  {
    return this.services.validation.validateRange(this.productForm, controlName);
  }
  //#endregion

  ngOnInit()
  {
  }

  //#region categories chips control 
  addcategory(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value)
    {
      this.categories.push(value);
      this.productForm.get('categoryControl')?.setValue(this.categories);
      this.productForm.get('categoryControl')?.updateValueAndValidity();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removecategory(category: string): void
  {
    const index = this.categories.indexOf(category);
    if (index >= 0)
    {
      this.categories.splice(index, 1);
      this.productForm.get('categoryControl')?.setValue(this.categories);

      this.productForm.get('categoryControl')?.updateValueAndValidity();
    }
  }

  notEmptyCategoriesValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null =>
  {
    if (this?.productForm?.get('categoryControl')?.value?.length >= 0)
    {
      return null;
    }
    else
    {
      return { emptyCategory: true };
    }
  }
  //#endregion

  //#region Form related logic
  onSubmit(): void
  {
    if (this.productForm.valid)
    {
      const newProduct = this.productForm.value;
      console.log('Product added:', newProduct);
      // call api
      this.services.product.addProducts$(this.productForm?.value as Product)
        .subscribe();
      //unsubscribe

    }
  }

  clearForm()
  {
    this.productForm.reset();
  }
  //#endregion
}
