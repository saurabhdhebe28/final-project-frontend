import { Component } from '@angular/core';
import { OfferService } from '../../offers/offer.service';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  selector: 'app-redeem-voucher-list',
  templateUrl: './redeem-voucher-list.component.html',
  styleUrls: ['./redeem-voucher-list.component.css']
})
export class RedeemVoucherListComponent {
  getUrl: string = 'http://localhost:3000/voucher/redeem-list';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  voucherCode: any = ''
  brand: any = ''
  merchant: any = ''
  totalItem: number = 0
  data: any;
  lastName: any = ''
  chartData: any = ''
  labelData: any = ''
  realData: any = ''
  colorData: any = ''
  searchData: any;
  constructor(private voucherService: VoucherService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    const body = {}
    this.voucherService.redeemVoucher(this.getUrl, body).subscribe(res => {
      this.chartData = res
      if (this.chartData != null) {
        for (let i = 0; i < this.chartData.length; i++) {
          // console.log(this.chartData[i]);
          this.labelData.push(this.chartData[i])

        }
      }
    })
    this.createBarChart()
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
  createBarChart(): void {
    const chartDom = document.getElementById('barChart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: 'Offers and Vouchers Redeemed'
      },
      xAxis: {
        type: 'category',
        data: ['January', 'February', 'March', 'April', 'May', 'June']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110],
        type: 'bar'
      }]
    };

    myChart.setOption(option);
  }

}
