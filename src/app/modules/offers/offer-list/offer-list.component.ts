import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent {
  getUrl: string = 'http://localhost:3000/offers/get-offers';
  offerTitle: any = '';
  offerCode: any = '';
  merchants: any = '';
  brands: any = '';
  disableButtonvalue = true;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  totalItem: number = 0;
  data: any;
  searchData: any;
  allData: any;
  constructor(private offerService: OfferService, private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.offerTitle = '';
    this.offerCode = '';
    this.merchants = '';
    this.brands = '';
    this.getOffers();
  }
  getOffers() {
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
      !this.offerTitle &&
      !this.offerCode &&
      !this.merchants &&
      !this.brands
    ) {
      this.ngOnInit();
    }
  }
  disableButton() {
    this.disableButtonvalue = !this.offerTitle;
  }

  search() {
    this.searchData = this.data;
    this.searchData = this.data.filter((value: any) => {
      const title = value.offerTitle
        ?.toLowerCase()
        .includes(this.offerTitle?.toLowerCase());
      const code = value.offerCode?.includes(this.offerCode);
      const merchant = value.merchants
        ?.toLowerCase()
        .includes(this.merchants?.toLowerCase());
      const brand = value.brands
        ?.toLowerCase()
        .includes(this.brands?.toLowerCase());
      return title && code && merchant && brand;
    });
  }
}
