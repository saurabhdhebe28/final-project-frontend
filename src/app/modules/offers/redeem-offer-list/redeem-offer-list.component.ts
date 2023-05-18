import { Component } from '@angular/core';
import { OfferService } from '../offer.service';
import { DatePipe } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  selector: 'app-redeem-offer-list',
  templateUrl: './redeem-offer-list.component.html',
  styleUrls: ['./redeem-offer-list.component.css']
})

export class RedeemOfferListComponent {
  getUrl: string = 'http://localhost:3000/offers/redeem-list';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData: any;
  lastName: any;
  offerCode: any;
  merchant: any;
  brand: any;
  chartOptions: any;
  seriesData: any[] = [];

  constructor(private offerService: OfferService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.firstName = '';
    this.lastName = '';
    this.offerCode = '';
    this.merchant = '';
    this.brand = '';
    this.getPurchasedOffers()
    this.chartOptions = {
      // Set your chart options here
      title: {
        text: 'Offer redeemed list'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Data',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };


  }

  getPurchasedOffers() {
    this.offerService.getOffer(this.getUrl).subscribe((value: any) => {
      value.data.map((ele: any) => {
        ele.offerExpiryDate = this.datePipe.transform(
          ele.offerExpiryDate,
          'dd-MM-yyyy'
        );
      });
      this.searchData = value.data;
      this.data = value.data;
    })
    this.offerService.getByMonth('http://localhost:3000/offers/get-by-month').subscribe((value: any) => {
      value.data.map((ele: any) => {
        this.chartOptions.series[0].data[ele.month - 1] = ele.count
      })
      const chartElement = document.getElementById('chartContainer');
      console.log(chartElement);

      if (chartElement) {
        const myChart = echarts.init(chartElement);
        console.log(myChart);

        myChart.setOption(this.chartOptions);
      }
      console.log(this.chartOptions);

    })

  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  inp() {
    if (
      !this.firstName &&
      !this.lastName &&
      !this.merchant &&
      !this.brand
    ) {
      this.ngOnInit();
    }
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }
  search() {
    this.searchData = this.data;
    this.searchData = this.data.filter((value: any) => {
      const first = value.firstName
        ?.toLowerCase()
        .includes(this.firstName?.toLowerCase());
      const last = value.lastName?.toLowerCase().includes(this.lastName.toLowerCase());
      const code = value.offerCode?.includes(this.offerCode);
      const merchant = value.merchants
        ?.toLowerCase()
        .includes(this.merchant?.toLowerCase());
      const brand = value.brands
        ?.toLowerCase()
        .includes(this.brand?.toLowerCase());
      return first && code && last && merchant && brand;
    });
  }
}