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
  lastName: any = ''
  voucherCode: any = ''
  merchant: any = ''
  brand: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData: any;
  userId: any;
  voucherId: any;

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
      console.log(this.data);

      this.searchData = value.data

    })
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }

  inp() {
    if (
      !this.firstName &&
      !this.lastName &&
      !this.voucherCode &&
      !this.merchant &&
      !this.brand
    ) {
      this.ngOnInit();
    }
  }
  redeem(id: any) {

    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher', { purchaseVoucherId: id }).subscribe((data: any) => {

      this.userId = '';
      this.voucherId = '';
      this.ngOnInit();
    });
  }
  search() {
    this.searchData = this.data;
    this.searchData = this.data.filter((value: any) => {
      const first = value.firstName
        ?.toLowerCase()
        .includes(this.firstName?.toLowerCase());
      const last = value.lastName?.toLowerCase().includes(this.lastName.toLowerCase());
      const code = value.voucherCode?.includes(this.voucherCode);
      const merchant = value.merchants
        ?.toLowerCase()
        .includes(this.merchant?.toLowerCase());
      const brand = value.brands
        ?.toLowerCase()
        .includes(this.brand?.toLowerCase());
      return first && code && last && merchant && brand;
    });
  }
  purchase() {
    this.voucherService.assignVoucher('http://localhost:3000/voucher/assign-voucher', { userId: this.userId, voucherId: this.voucherId }).subscribe((data: any) => {
      this.userId = ''
      this.voucherId = ''
      this.ngOnInit()
    })
  }

}
