import { Component } from '@angular/core';
import { VoucherService } from '../voucher.service';

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

  constructor(private voucherService: VoucherService) { }

  ngOnInit(): void {
    this.getVoucher()
  }
  getVoucher() {
    this.voucherService.getVoucher('http://localhost:3000/voucher/get-voucher').subscribe((voucher: any) => {
      this.data = voucher.Data
    })

  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.voucherTitle
  }
  search() {
    this.data.map((value: any) => {
      if (value.voucherTitle == this.voucherTitle) {
        this.data = [value]
      }
    })

  }
  redeem(code: any) {
    const body = { offerCode: code }
    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher', body).subscribe((data: any) => {
      console.log(data);

    });
    this.getVoucher();
  }
}
