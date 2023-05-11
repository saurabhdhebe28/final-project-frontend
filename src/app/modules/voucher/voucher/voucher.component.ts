import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoucherService } from '../voucher.service';
import { imageValidator } from 'src/app/validation/image-validation';
import { DatePipe } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

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
  today:any
  minDate:String

  constructor(private voucherService: VoucherService, private datePipe: DatePipe,private toastr:ToastrService) {
    this.today = new Date();
    const year = this.today.getFullYear();
    const month = this.today.getMonth() + 1;
    const day = this.today.getDate();
    this.minDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;
  }

  voucherForm = new FormGroup({
    voucherTitle: new FormControl('',Validators.required),
    voucherImage: new FormControl('',[Validators.required,imageValidator]),
    pointRate: new FormControl('', [Validators.required, Validators.pattern("^[0-9].*$")]),
    merchant: new FormControl('',Validators.required),
    brands: new FormControl('',Validators.required),
    denominationStep: new FormControl('',[Validators.required, Validators.pattern("^[0-9].*$")]),
    denominationStart: new FormControl('',[Validators.required, Validators.pattern("^[0-9].*$")]),
    denominationEnd: new FormControl('',[Validators.required, Validators.pattern("^[0-9].*$")]),
    voucherExpiryDate: new FormControl('',Validators.required),
    voucherCode: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    termsAndConditions: new FormControl('',Validators.required),

  })

getData(name:any){
  this.details[name] = this.voucherForm.get(name);
    this.error[name] = this.details[name].errors;
}

checkDate() {
  if (Date.parse(this.inpValue.voucherExpiryDate) < Date.parse(this.today)) {
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.inpValue.voucherExpiryDate = this.today;
    console.log(this.today);
    this.toastr.error('Invalid Date')
    this.error['voucherExpiryDate'] = { date: true };
    setTimeout(() => {
      this.error['voucherExpiryDate'] = { date: false };
    }, 1000);
  } else {
  }
}
file(e:any){
  this.files.voucherImage=e.target.files[0];
  if (!this.error.voucherImage) {
    if (this.files.voucherImage.size > 500000) {
      this.voucherForm.get('voucherImage')?.setValue('');
      this.error['voucherImage'] = { size: true };
    } else {
      this.error['voucherImage'] = { size: false };
    }
  }
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
