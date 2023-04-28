import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {
  // inp(e:any){
  //   return e
  // }

  voucherForm = new FormGroup({
    voucherTitle: new FormControl(''),
    voucherImage: new FormControl(''),
    pointRate: new FormControl(''),
    merchant: new FormControl(''),
    brands: new FormControl(''),
    denominationStep: new FormControl(''),
    denominationStart: new FormControl(''),
    denominationEnd: new FormControl(''),
    voucherExpiryDate: new FormControl(''),
    voucherCode: new FormControl('')
  })
error: any;
merchants: any;
Brands: any;

  constructor() { }

  get offerTitle() {
    return this.voucherForm.get('voucherTitle')
  }
  get offerImage() {
    return this.voucherForm.get('voucherImage')
  }
  get offerCode() {
    return this.voucherForm.get('pointRate')
  }
  get merchant() {
    return this.voucherForm.get('merchant')
  }
  get brands() {
    return this.voucherForm.get('brands')
  }
  get denominationStep() {
    return this.voucherForm.get('denominationStep')
  }
  get denominationStart() {
    return this.voucherForm.get('denominationStart')
  }
  get denominationEnd() {
    return this.voucherForm.get('denominationEnd')
  }
  get voucherExpiryDate() {
    return this.voucherForm.get('voucherExpiryDate')
  }
  get voucherCode() {
    return this.voucherForm.get('voucherCode')
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
