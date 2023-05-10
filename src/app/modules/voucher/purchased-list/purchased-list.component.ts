import { Component } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  getUrl:string='http://localhost:3000/voucher/purchase-voucher';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData:any;

  constructor(private voucherService: VoucherService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.getPurchasedVouchers()
  }
  getPurchasedVouchers() {
    this.voucherService.getVoucher(this.getUrl).subscribe((value: any) => {
      value.data.map((ele: any) => {
        ele.offerExpiryDate = this.datePipe.transform(
          ele.offerExpiryDate,
          'dd-MM-yyyy'
        );
      });
      this.data = value.data
      this.searchData = value.data
      
    })
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }

  redeem(id:any){
    console.log('id', this.data);
    
    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher',{purchaseVoucherId:id}).subscribe((data:any)=>{
      this.ngOnInit();
    });
  }
  search() {
 this.searchData = this.data
    if (!this.firstName) {
      this.ngOnInit()
     }
     this.searchData = this.data.filter((value: any) => {
      return value.firstName.toLowerCase().startsWith(this.firstName.toLowerCase())
    });
  }
}
