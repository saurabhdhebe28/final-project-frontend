import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { OfferService } from '../../offers/offer.service';
import { VoucherService } from '../../voucher/voucher.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  lineChartOptions: any;
  barChartOptions: any;
  pieChartOptions: any;
  seriesData: any[] = [];
  defaultMonth: any;
  selectedMonth: any;
  index: any;
  months: any = [
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
  totalCount = {
    totalOffer: 0,
    redeemedOffer: 0,
    totalVoucher: 0,
    redeemedVoucher: 0,
  };

  constructor(
    private offerService: OfferService,
    private datePipe: DatePipe,
    private voucherSerevice: VoucherService
  ) {
    let d = new Date();
    this.defaultMonth = d.getMonth();
    this.selectedMonth = this.months[this.defaultMonth];

    this.lineChartOptions = {
      title: {
        text: 'Line Chart',
      },
      xAxis: {
        type: 'category',
        data: this.months,
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['offers', 'voucher'], // Define legend labels
      },

      series: [
        {
          name: 'offers',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'blue', // Customize the label color
          },
        },
        {
          name: 'voucher',
          type: 'line',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'green', // Customize the label color
          },
        },
      ],
    };

    this.barChartOptions = {
      title: {
        text: 'Bar Chart',
      },
      xAxis: {
        type: 'category',
        data: this.months,
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['offer', 'voucher'], // Define legend labels
      },
      series: [
        {
          name: 'offer',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'blue', // Customize the label color for Offers
          },
        },
        {
          name: 'voucher',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: {
            show: true,
            position: 'top',
            color: 'green', // Customize the label color for Offers
          },
        },
      ],
    };
  }
  ngOnInit(): void {
    this.getCount();
    this.pie();
    this.chartData();
  }

  pie() {
    this.index = this.months.indexOf(this.selectedMonth);
    this.chartData();
  }
  pie1() {
    this.pieChartOptions = {
      title: {
        text: 'Pie Chart',
        subtext: 'Monthly Distribution',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%) - {c} redeemed',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Offers', 'Vouchers'],
      },
      series: [
        {
          name: 'Data',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 0, name: 'Offers' },
            { value: 0, name: 'Vouchers' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
  chartData() {
    this.index = this.months.indexOf(this.selectedMonth);
    this.pie1();
    this.offerService
      .getByMonth('http://localhost:3000/offers/get-by-month')
      .subscribe((value: any) => {
        value.data[0].map((ele: any) => {
          this.lineChartOptions.series[0].data[ele.month - 1] = ele.count;
          this.barChartOptions.series[0].data[ele.month - 1] = ele.count;
          if (ele.month == this.index + 1) {
            this.pieChartOptions.series[0].data[0].value = ele.count;
          }
        });
      });

    this.voucherSerevice
      .getByMonth('http://localhost:3000/voucher/get-by-month')
      .subscribe((value: any) => {
        value.data[0].map((ele: any) => {
          this.lineChartOptions.series[1].data[ele.month - 1] = ele.count;
          this.barChartOptions.series[1].data[ele.month - 1] = ele.count;
          if (ele.month == this.index + 1) {
            this.pieChartOptions.series[0].data[1].value = ele.count;
          }
        });

        const lineContainer = document.getElementById('lineContainer');
        const barContainer = document.getElementById('barContainer');
        const PieContainer = document.getElementById('pieContainer');
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
  getCount() {
    this.offerService
      .getOffer('http://localhost:3000/offers/get-offers')
      .subscribe((data) => {
        this.totalCount.totalOffer = data.data.length;
      });
    this.offerService
      .getOffer('http://localhost:3000/offers/redeem-list')
      .subscribe((data) => {
        this.totalCount.redeemedOffer = data.data.length;
      });
    this.voucherSerevice
      .getVoucher('http://localhost:3000/voucher/get-voucher')
      .subscribe((data) => {
        this.totalCount.totalVoucher = data.data.length;
      });
    this.voucherSerevice
      .getVoucher('http://localhost:3000/voucher/redeem-list')
      .subscribe((data) => {
        this.totalCount.redeemedVoucher = data.data.length;
      });
  }
}
