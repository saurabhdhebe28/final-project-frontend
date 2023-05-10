import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../offer.service';
import { imageValidator } from 'src/app/validation/image-validation';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  minDate: string;
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
  files: any = {
    offerImage: '',
  };
  today: any;

  constructor(private offerService: OfferService, private datePipe: DatePipe,private toastr:ToastrService) {
    this.today = new Date();
    const year = this.today.getFullYear();
    const month = this.today.getMonth() + 1;
    const day = this.today.getDate();
    this.minDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;
  }

  offers = new FormGroup({
    offerTitle: new FormControl('', Validators.required),
    offerImage: new FormControl('', [Validators.required, imageValidator]),
    offerCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    merchant: new FormControl('', Validators.required),
    brands: new FormControl('', Validators.required),
    minAmount: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9].*$'),
    ]),
    offerType: new FormControl('', Validators.required),
    limit: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9].*$'),
    ]),
    offerExpiry: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
  });

  checkDate() {
    if (Date.parse(this.inpValue.offerExpiry) < Date.parse(this.today)) {
      this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
      this.inpValue.offerExpiry = this.today;
      console.log(this.today);
      this.toastr.error('invalid Date')
      this.error['offerExpiry'] = { date: true };
      setTimeout(() => {
        this.error['offerExpiry'] = { date: false };
      }, 1000);
    } else {
    }
  }

  getData(name: any) {
    this.details[name] = this.offers.get(name);
    this.error[name] = this.details[name].errors;    
  }

  file(e: any) {
    this.files.offerImage = e.target.files[0];
    if (!this.error.offerImage) {
      if (this.files.offerImage.size > 500000) {
        this.offers.get('offerImage')?.setValue('');
        this.error['offerImage'] = { size: true };
      } else {
        this.error['offerImage'] = { size: false };
      }
    }
  }

  createOffer() {
    const formData = new FormData();
    formData.append('offerTitle', this.inpValue.offerTitle);
    formData.append('offerImage', this.files.offerImage);
    formData.append('offerCode', this.inpValue.offerCode);
    formData.append('merchant', this.inpValue.merchant);
    formData.append('brand', this.inpValue.brands);
    formData.append('minAmount', this.inpValue.minAmount);
    formData.append('offerType', this.inpValue.offerType);
    formData.append('limit', this.inpValue.limit);
    formData.append('offerExpiry', this.inpValue.offerExpiry);
    formData.append('terms', this.inpValue.terms);

    this.offerService
      .craeteOffer('http://localhost:3000/offers/create-offer', formData)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
