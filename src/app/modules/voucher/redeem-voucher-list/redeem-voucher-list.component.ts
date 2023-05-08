import { Component } from '@angular/core';
import { OfferService } from '../../offers/offer.service';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-redeem-voucher-list',
  templateUrl: './redeem-voucher-list.component.html',
  styleUrls: ['./redeem-voucher-list.component.css']
})
export class RedeemVoucherListComponent {
  getUrl:string='http://localhost:3000/voucher/redeem-list';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  constructor(private voucherService: VoucherService) { }
  ngOnInit(): void {
    this.getPurchaseVoucher()
  }
  getPurchaseVoucher() {
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
  search() {
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })

  }
}
