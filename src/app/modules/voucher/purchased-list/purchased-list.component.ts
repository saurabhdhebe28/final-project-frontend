import { Component } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';
import { OfferService } from '../../offers/offer.service';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  getUrl: string = 'http://localhost:3000/voucher/get-assigned-voucher';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData: any;
  userId:any;
  voucherId:any;

  constructor(private voucherService: VoucherService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.getPurchasedVouchers()
  }
  getPurchasedVouchers() {
    this.voucherService.getVoucher(this.getUrl).subscribe((value: any) => {
      value.data.map((ele: any) => {
        ele.voucherExpiryDate = this.datePipe.transform(
          ele.voucherExpiryDate,
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
      this.userId='';
      this.voucherId='';
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
  purchase(){
    this.voucherService.assignVoucher('http://localhost:3000/voucher/assign-voucher',{userId:this.userId,voucherId:this.voucherId}).subscribe((data:any)=>{
      this.userId=''
      this.voucherId=''
      this.ngOnInit()
    })
  }
}
