import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // No file selected, so no validation error
  }
  const file = control.value;
  
  if (!file.endsWith('.png') && !file.endsWith('.jpeg') && !file.endsWith('.jpg')) {
    control.setValue('')
    return { image: true }; // Validation error: file type is not allowed
  }
  return null; // File is an image and validation passes
}