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
    minAmount: new FormControl('', Validators.required),
    offerType: new FormControl('', Validators.required),
    limit: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor() { }

  getData(name: any) {
    this.details = this.offers.get(name);
    switch (name) {
      case 'offerTitle':
        this.error.offerTitle = this.details.errors;
        console.log(this.error.offerTitle)
        break;
      case 'offerImage':
        this.error.offerImage = this.details.errors;
        break;
      case 'offerCode':
        this.error.offerCode = this.details.errors;
        break;
      case 'merchant':
        this.error.merchant = this.details.errors;
        break;
      case 'brands':
        this.error.brands = this.details.errors;
        break;
      case 'minAmount':
        this.error.minAmount = this.details.errors;
        break;
      case 'offerType':
        this.error.offerType = this.details.errors;
        break;
      case 'limit':
        this.error.limit = this.details.errors;
        break;
      case 'date':
        this.error.date = this.details.errors;
        break;

      default:
        break;
    }
  }



  createOffer() {
    console.log(this.inpValue);
  }
}
