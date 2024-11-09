import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService
{
  constructor() { }

  validateRequired(form: FormGroup, controlName: string): boolean
  {
    return form?.get(controlName)?.hasError('required') ?? false;
  }

  validateValueRange(form: FormGroup, controlName: string): boolean
  {
    return (form.get(controlName)?.hasError('min') || form?.get(controlName)?.hasError('max')) ?? false;
  }

  validateLengthRange(form: FormGroup, controlName: string): boolean
  {
    return (form.get(controlName)?.hasError('minLength') || form?.get(controlName)?.hasError('maxLength')) ?? false;
  }

  getValidationError(form: FormGroup, controlName: string, errorName: string): string
  {
    return form.get(controlName)?.getError(errorName);
  }
}
