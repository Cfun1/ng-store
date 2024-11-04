import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService
{
  constructor() { }

  validateRequired(form: FormGroup, controlName: string)
  {
    return form?.get(controlName)?.hasError('required');
  }

  validateRange(form: FormGroup, controlName: string)
  {
    return form.get(controlName)?.hasError('min') || form?.get(controlName)?.hasError('max');
  }
}
