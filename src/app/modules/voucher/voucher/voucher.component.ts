import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {
  inpValue:any={
    voucherTitle:'',
    voucherImage:'',
    pointRate:'',
    merchant:'',
    brands:'',
    denominationStep:'',
    denominationStart:'',
    denominationEnd:'',
    offerExpiryDate:'',
    voucherCode:''
  };
  details:any={};
  error: any = {};
  voucherData:any={}
  merchants: any=['amazon','flipkart'];
  Brands: any=['Puma','Nike'];

  constructor() {}

  voucherForm = new FormGroup({
    voucherTitle: new FormControl('',Validators.required),
    voucherImage: new FormControl('',Validators.required),
    pointRate: new FormControl('',Validators.required),
    merchant: new FormControl('',Validators.required),
    brands: new FormControl('',Validators.required),
    denominationStep: new FormControl('',Validators.required),
    denominationStart: new FormControl('',Validators.required),
    denominationEnd: new FormControl('',Validators.required),
    voucherExpiryDate: new FormControl('',Validators.required),
    voucherCode: new FormControl('',Validators.required)
  })

getData(name:any){
  this.voucherData[name] = this.inpValue[name];
  this.details = this.voucherForm.get(name);
  console.log('details',this.details);
  
    switch (name) {
      case 'voucherTitle':
        this.error.voucherTitle = this.details.errors;
        break;
      case 'voucherImage':
        this.error.voucherImage = this.details.errors;
        break;
      case 'pointRate':
        this.error.pointRate = this.details.errors;
        break;
      case 'merchant':
        this.error.merchant = this.details.errors;
        break;
      case 'brands':
        this.error.brands = this.details.errors;
        break;
      case 'denominationStep':
        this.error.denominationStep = this.details.errors;
        break;
      case 'denominationStart':
        this.error.denominationStart = this.details.errors;
        break;
      case 'denominationEnd':
        this.error.denominationEnd = this.details.errors;
        break;
      case 'voucherExpiryDate':
        this.error.voucherExpiryDate = this.details.errors;
        break;
      case 'voucherCode':
        this.error.voucherCode = this.details.errors;
        break;

      default:
        break;
    }
    console.log(this.voucherData);
    console.log(this.details.errors,'details');
}

submit(){
  return null;
}
}
