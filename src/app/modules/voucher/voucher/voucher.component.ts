import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoucherService } from '../voucher.service';


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {
  inpValue:any={
    voucherTitle:'',
    pointRate:'',
    merchant:'',
    brands:'',
    denominationStep:'',
    denominationStart:'',
    denominationEnd:'',
    voucherExpiryDate:'',
    voucherCode:'',
    termsAndConditions:''
  };
  details:any={};
  error: any = {};
  merchants: any=['amazon','flipkart'];
  Brands: any=['Puma','Nike'];
  files:any={voucherImage:''}

  constructor( private voucherService:VoucherService) {
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
    voucherCode: new FormControl('',Validators.required),
    termsAndConditions: new FormControl('',Validators.required),

  })

getData(name:any){
  this.details = this.voucherForm.get(name);
  this.error[name] = this.details.errors
}

file(e:any){
  this.files.voucherImage=e.target.files[0]
}
createVoucher() {
  const formData = new FormData()
  formData.append('voucherTitle',this.inpValue.voucherTitle)
  formData.append('voucherImage',this.files.voucherImage)
  formData.append('pointRate',this.inpValue.pointRate)
  formData.append('merchant',this.inpValue.merchant)
  formData.append('brands',this.inpValue.brands)
  formData.append('denominationStep',this.inpValue.denominationStep)
  formData.append('denominationStart',this.inpValue.denominationStart)
  formData.append('denominationEnd',this.inpValue.denominationEnd)
  formData.append('voucherExpiryDate',this.inpValue.voucherExpiryDate)
  formData.append('voucherCode',this.inpValue.voucherCode)
  formData.append('termsAndConditions',this.inpValue.termsAndConditions)
  
  this.voucherService.createVoucher('http://localhost:3000/voucher/create-voucher',formData).subscribe((data:any)=>{
    console.log(data)
  })

}
}
