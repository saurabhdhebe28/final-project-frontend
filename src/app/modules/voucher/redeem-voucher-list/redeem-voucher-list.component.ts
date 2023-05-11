import { Component } from '@angular/core';
import { OfferService } from '../../offers/offer.service';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';

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
  searchData: any;
  constructor(private voucherService: VoucherService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.getPurchaseVoucher()
  }
  getPurchaseVoucher() {
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
  search() {
      this.searchData = this.data
      // if (!this.firstName) {
      //   this.ngOnInit()
      //  }
       this.searchData = this.data.filter((value: any) => {
        return value.firstName.toLowerCase().startsWith(this.firstName.toLowerCase())
      });
  }
}
