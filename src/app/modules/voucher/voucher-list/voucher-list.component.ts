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
  voucherCode:any=''
  merchants:any=''
  brands:any=''
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData: any;

  constructor(private voucherService: VoucherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getVoucher();
  }

  getVoucher(){
    this.voucherService.getVoucher('http://localhost:3000/voucher/get-voucher').subscribe((voucher: any) => {
      voucher.data.map((ele: any) => {
        ele.voucherExpiryDate = this.datePipe.transform(
          ele.voucherExpiryDate,
          'dd-MM-yyyy'
        );
      });
      this.searchData= voucher.data;
      this.data = voucher.data;
    })
  }

  onPageChange(event: any) {
    this.currentPage = event
  }

  inp() {
    if (
      !this.voucherTitle &&
      !this.voucherCode &&
      !this.merchants &&
      !this.brands
    ) {
      this.ngOnInit();
    }
  }
  disableButton() {
    this.disableButtonvalue = !this.voucherTitle
  }

  search() {
    this.searchData = this.data;
    this.searchData = this.data.filter((value: any) => {
      const title = value.voucherTitle
        ?.toLowerCase()
        .includes(this.voucherTitle?.toLowerCase());
      const code = value.voucherCode?.includes(this.voucherCode);
      const merchant = value.merchants
        ?.toLowerCase()
        .includes(this.merchants?.toLowerCase());
      const brand = value.brands
        ?.toLowerCase()
        .includes(this.brands?.toLowerCase());
      return title && code && merchant && brand;
    });
  }
  // }
  redeem(code: any) {
    const body = { offerCode: code }
    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher', body).subscribe((data: any) => {
      console.log(data);

    });
    this.getVoucher();
  }
}
