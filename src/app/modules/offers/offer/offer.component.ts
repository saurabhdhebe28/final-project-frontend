import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  inpValue: any = {
    offerTitle: '',
    offerImage: '',
    offerCode: '',
    merchant: '',
    brands: '',
    minAmount: '',
    offerType: '',
    limit: '',
    offerExpiryDate: '',
  };
  details: any = {};
  error: any = {};
  merchants: any = ['amazon', 'flipkart'];
  Brands: any = ['Puma', 'Nike'];

  offers = new FormGroup({
    offerTitle: new FormControl('', Validators.required),
    offerImage: new FormControl('', Validators.required),
    offerCode: new FormControl('', Validators.required),
    merchant: new FormControl('', Validators.required),
    brands: new FormControl('', Validators.required),
    minAmount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    offerType: new FormControl('', Validators.required),
    limit: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    date: new FormControl('', Validators.required),
  });

  constructor() {}

  getData(name: any) {
    this.details = this.offers.get(name);
    console.log(this.details);
    this.error[name] = this.details.errors;
  }

    createOffer() {
      
      if (this.offers.invalid) {
        // Show error message
        console.log(this.offers);
        return;
      }
  
      // Submit form data
      console.log(this.offers.value);
    }
  }