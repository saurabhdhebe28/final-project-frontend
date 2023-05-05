import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  inpValue: any = {
    offerTitle: '',
    offerCode: '',
    merchant: '',
    brands: '',
    minAmount: '',
    offerType: '',
    limit: '',
    offerExpiry: '',
    terms: '',
  };
  details: any = {};
  error: any = {};
  merchants: any = ['amazon', 'flipkart'];
  Brands: any = ['Puma', 'Nike'];
  files:any={
    offerImage:''
  }

  offers = new FormGroup({
    offerTitle: new FormControl('', Validators.required),
    offerImage: new FormControl('', Validators.required),
    offerCode: new FormControl('', Validators.required),
    merchant: new FormControl('', Validators.required),
    brands: new FormControl('', Validators.required),
    minAmount: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    offerType: new FormControl('', Validators.required),
    limit: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    offerExpiry: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
  });

  constructor(private offerService:OfferService) {}

  getData(name: any) {
    this.details = this.offers.get(name);
    this.error[name] = this.details.errors;
  }

  file(e:any){
   this.files.offerImage= e.target.files[0]
   
  }

  createOffer() {
    const formData = new FormData();
    formData.append('offerTitle',this.inpValue.offerTitle)
    formData.append('offerImage',this.files.offerImage)
    formData.append('offerCode',this.inpValue.offerCode)
    formData.append('merchant',this.inpValue.merchant)
    formData.append('brand',this.inpValue.brands)
    formData.append('minAmount',this.inpValue.minAmount)
    formData.append('offerType',this.inpValue.offerType)
    formData.append('limit',this.inpValue.limit)
    formData.append('offerExpiry',this.inpValue.offerExpiry)
    formData.append('terms',this.inpValue.terms)
    
    this.offerService.craeteOffer('http://localhost:3000/offers/create-offer',formData).subscribe((data:any)=>{
      console.log(data)
    })
  }
}