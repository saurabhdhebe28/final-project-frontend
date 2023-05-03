import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
   selectedFile:any

  inpValue: any = {
    offerTitle: '',
    offerCode: '',
    merchant: '',
    brand: '',
    minAmount: '',
    offerType: '',
    limit: '',
    offerExpiry: '',
  };
  files:any={};
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
    offerExpiry: new FormControl('', Validators.required),
    termsAndConditions: new FormControl('',Validators.required)
  });

  constructor(private offerService:OfferService) {}
file(e:any){
  // console.log(e.target.files[0],'files')
  this.selectedFile = e.target.files[0];
  // console.log(this.selectedFile,'selected');
  this.files.offerImage =  this.selectedFile 
  // console.log(this.files);
  
}
  getData(name: any) {
    this.details = this.offers.get(name);
    console.log(this.details);
    this.error[name] = this.details.errors;
  }

  
  createOffer() {
    const formData = new FormData()
    console.log(this.files.offerImage,'selectedFile')
    formData.append('offerImage',this.selectedFile,this.selectedFile.name)
    console.log(formData,'form')
    this.offerService.createOffer('http://localhost:3000/offer/create-offer',this.inpValue).subscribe((data:any)=>{
    console.log(data);
    })
  }
}
