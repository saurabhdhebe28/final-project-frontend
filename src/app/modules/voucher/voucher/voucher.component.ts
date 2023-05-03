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
    voucherExpiryDate:'',
    voucherCode:''
  };
  details:any={};
  error: any = {};
  merchants: any=['amazon','flipkart'];
  Brands: any=['Puma','Nike'];

  constructor() {
  }

  voucherForm = new FormGroup({
    voucherTitle: new FormControl('',Validators.required),
    voucherImage: new FormControl('',Validators.required),
    pointRate: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    merchant: new FormControl('',Validators.required),
    brands: new FormControl('',Validators.required),
    denominationStep: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    denominationStart: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    denominationEnd: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    voucherExpiryDate: new FormControl('',Validators.required),
    voucherCode: new FormControl('',Validators.required)
  })

getData(name:any){
  this.details = this.voucherForm.get(name);
  this.error[name] = this.details.errors
}

createOffer() {
  console.log(this.inpValue);
}
}
