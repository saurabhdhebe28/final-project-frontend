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
  defaultMonth: any;
  selectedMonth: any;
  index: any;

  constructor(
    private offerService: OfferService,
    private datePipe: DatePipe,
    private voucherSerevice: VoucherService
  ) {}
  ngOnInit(): void {
    this.firstName = '';
    this.lastName = '';
    this.offerCode = '';
    this.merchant = '';
    this.brand = '';

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
