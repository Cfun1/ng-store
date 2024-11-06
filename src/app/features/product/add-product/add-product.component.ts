import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { tap } from 'rxjs';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit
{
  //#region DI
  private services = {
    //fb: inject(FormBuilder),
    validation: inject(ValidationService),
    product: inject(ProductService)
  }
  productForm!: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
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

  //#region categories chips control */
  add(event: MatChipInputEvent): void
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

  remove(category: string): void
  {
    const index = this.categories.indexOf(category);
    if (index >= 0)
    {
      this.categories.splice(index, 1);
      this.productForm.get('categoryControl')?.setValue(this.categories);
      console.log(this?.productForm?.get('categoryControl')?.value && this.productForm?.get('categoryControl')?.value.length > 0)

      this.productForm.get('categoryControl')?.updateValueAndValidity();
    }
  }



  notEmptyCategoriesValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null =>
  {
    console.log('iniit ', this?.productForm?.get('categoryControl')?.value?.length)
    if (this?.productForm?.get('categoryControl')?.value?.length >= 0)
    {
      return null; //null;
    }
    else
    {
      return { emptyCategory: true };// { required: true };
    }
  }
  //#endregion



  onSubmit(): void
  {
    if (this.productForm.valid)
    {
      const newProduct = this.productForm.value;
      console.log('Product added:', newProduct);
      // call api
      this.services.product.addProducts$(this.productForm?.value as Product)
        .pipe(tap(val => console.log('prDD/ ', val)))
        .subscribe();

    }
  }

  clearForm()
  {
    this.productForm.reset();
  }
}
