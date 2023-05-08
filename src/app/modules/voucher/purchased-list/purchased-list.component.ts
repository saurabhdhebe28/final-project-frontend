import { Component } from '@angular/core';
import { OfferService } from '../../offers/offer.service';
import { VoucherService } from '../voucher.service';

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
  constructor(private voucherService: VoucherService) { }
  ngOnInit(): void {
    this.getPurchasedVouchers()
  }
  getPurchasedVouchers() {
    this.voucherService.getVoucher(this.getUrl).subscribe((value: any) => {
      this.data = value.data
      
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
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })

  }
}
