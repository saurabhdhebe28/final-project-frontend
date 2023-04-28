import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  offers = new FormGroup({
    offerTitle: new FormControl(''),
    offerImage: new FormControl(''),
    offerCode: new FormControl(''),
    merchant: new FormControl(''),
    brands: new FormControl(''),
    minAmount: new FormControl(''),
    offerType: new FormControl(''),
    limit: new FormControl(''),
    offerExpiryDate: new FormControl('')
  })
error: any;
merchants: any;
Brands: any;

  constructor() { }

  get offerTitle() {
    return this.offers.get('offerTitle')
  }
  get offerImage() {
    return this.offers.get('offerImage')
  }
  get offerCode() {
    return this.offers.get('offerCode')
  }
  get merchant() {
    return this.offers.get('merchant')
  }
  get brands() {
    return this.offers.get('brands')
  }


  inp(e: any) {
    return e
  }

  getError(b: any) {
    return null
  }

  getFileDetails(b: any) {
    return null
  }
}
