import { Component } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent {
  getUrl: string = 'http://localhost:3000/voucher/get-voucher';
  voucherTitle: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData: any;

  constructor(private voucherService: VoucherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getVoucher();
  }
  getVoucher() {
    this.voucherService.getVoucher(this.getUrl).subscribe((voucher: any) => {
      this.data = voucher.data
    })
  }

  onPageChange(event: any) {
    this.currentPage = event
  }

  disableButton() {
    this.disableButtonvalue = !this.voucherTitle
  }

  search() {
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })

  }
  redeem(code: any) {
    const body = { offerCode: code }
    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher', body).subscribe((data: any) => {
      console.log(data);

    });
    this.getVoucher();
  }
}
