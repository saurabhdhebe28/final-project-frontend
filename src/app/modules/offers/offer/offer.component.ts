import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent {
  details: any;
  error: any = {};
  Brands:any = ['Puma','Nike']
  merchants:any = ['Godrej','Mamaearth']
  testForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    // lname: new FormControl('', Validators.required),
    // email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(12),
    // ]),
  });
  inp(e:any){
  return e
}
getFileDetails(fileInput: any) {
  console.log('Selected file name: ', fileInput.target.files[0].name);
}
getError(name: any) {
  this.details = this.testForm.get(name);
  switch (name) {
    case 'fname':
      this.error.fname = this.details.errors;
      break;
  

    default:
      break;
  }
}
}
