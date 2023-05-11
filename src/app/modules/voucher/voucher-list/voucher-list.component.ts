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
  searchData:any;

  constructor(private voucherService: VoucherService,private datePipe: DatePipe) { }

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

  disableButton() {
    this.disableButtonvalue = !this.voucherTitle
  }

  search() {
    this.searchData = this.data
    if (!this.voucherTitle) {
     this.ngOnInit()
    }
    this.searchData =this.data.filter((value: any) => {
      return value.voucherTitle?.toLowerCase().startsWith(this.voucherTitle?.toLowerCase())
    });
  }

  redeem(code: any) {
    const body = { offerCode: code }
    this.voucherService.redeemVoucher('http://localhost:3000/voucher/redeem-voucher', body).subscribe((data: any) => {
      console.log(data);
    });
    this.getVoucher();
  }
}
