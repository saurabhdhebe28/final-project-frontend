import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { OfferService } from '../offer.service';
import { DatePipe } from '@angular/common';
import { VoucherService } from '../../voucher/voucher.service';

@Component({
  selector: 'app-redeem-offer-list',
  templateUrl: './redeem-offer-list.component.html',
  styleUrls: ['./redeem-offer-list.component.css'],
})
export class RedeemOfferListComponent {
  getUrl: string = 'http://localhost:3000/offers/redeem-list';
  firstName: any = '';
  disableButtonvalue = true;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  totalItem: number = 0;
  data: any;
  searchData: any;
  lastName: any;
  offerCode: any;
  merchant: any;
  brand: any;
  lineChartOptions: any;
  barChartOptions: any;
  pieChartOptions: any;
  seriesData: any[] = [];
  defaultMonth:any;
  selectedMonth:any;
  index : any;
  months:any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(
    private offerService: OfferService,
    private datePipe: DatePipe,
    private voucherSerevice: VoucherService
  ) {
    let d = new Date();
    this.defaultMonth =d.getMonth();
  }
  ngOnInit(): void {
    this.firstName = '';
    this.lastName = '';
    this.offerCode = '';
    this.merchant = '';
    this.brand = '';
   
    this.lineChartOptions = {
      title: {
        text: 'Line Chart',
      },
      xAxis: {
        type: 'category',
        data: this.months
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['offers', 'voucher'] // Define legend labels
      },
     
      series: [
        {
          name: 'offers',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'blue' // Customize the label color
          }
        },
        {
          name: 'voucher',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'green' // Customize the label color
          }
        },
      ],
    };
    this.barChartOptions = {
      title: {
        text: 'Bar Chart',
      },
      xAxis: {
        type: 'category',
        data: this.months
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['offer', 'voucher'] // Define legend labels
      },
      series: [
        {
          name: 'offer',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'blue' // Customize the label color for Offers
          }

        },
        {
          name: 'voucher',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'green' // Customize the label color for Offers
          }
        },
      ],
    };

    
    this.getPurchasedOffers();
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
    });
    this.chartData();
  }

  pie(){
    this.index= this.months.indexOf(this.selectedMonth);
    this.chartData()
  }
pie1(){
  this.pieChartOptions = {
    title: {
      text: 'Dynamic Chart'
    },
    series: [
      {
        name: 'Data',
        type: 'pie',
        radius: '55%',
        data: [
          { value: 0, name: 'offers' },
          { value: 0, name: 'vouchers' },
        ]
      }
    ]
  };
}
  chartData() {
    this.index= this.months.indexOf(this.selectedMonth);
    this.pie1();
    this.offerService
      .getByMonth('http://localhost:3000/offers/get-by-month')
      .subscribe((value: any) => {  
        console.log(value.data);
        
        value.data[0].map((ele: any) => {
          this.lineChartOptions.series[0].data[ele.month - 1] = ele.count;
          this.barChartOptions.series[0].data[ele.month - 1] = ele.count;
          if (ele.month==(this.index+1)) { 
            this.pieChartOptions.series[0].data[0].value= ele.count
          }
        });
      });

    this.voucherSerevice
      .getByMonth('http://localhost:3000/voucher/get-by-month')
      .subscribe((value: any) => {
        value.data[0].map((ele: any) => {
          this.lineChartOptions.series[1].data[ele.month - 1] = ele.count;
          this.barChartOptions.series[1].data[ele.month - 1] = ele.count;
          if (ele.month==(this.index+1)) { 
            this.pieChartOptions.series[0].data[1].value= ele.count
          }
        });

        const lineContainer = document.getElementById('lineContainer');
        const barContainer = document.getElementById('barContainer');
        const PieContainer = document.getElementById('PieContainer');
        if (lineContainer) {
          const myChart = echarts.init(lineContainer);
          myChart.setOption(this.lineChartOptions);
        }
        if (barContainer) {
          const myChart = echarts.init(barContainer);
          myChart.setOption(this.barChartOptions);
        }
        if (PieContainer) {
          const myChart = echarts.init(PieContainer);
          myChart.setOption(this.pieChartOptions);
        }
      });
  }

  onPageChange(event: any) {
    this.currentPage = event;
  }
  inp() {
    if (
      !this.firstName &&
      !this.lastName &&
      !this.offerCode &&
      !this.merchant &&
      !this.brand
    ) {
      this.ngOnInit();
    }
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName;
  }
  search() {
    this.searchData = this.data;
    this.searchData = this.data.filter((value: any) => {
      const first = value.firstName
        ?.toLowerCase()
        .includes(this.firstName?.toLowerCase());
      const last = value.lastName
        ?.toLowerCase()
        .includes(this.lastName.toLowerCase());
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
