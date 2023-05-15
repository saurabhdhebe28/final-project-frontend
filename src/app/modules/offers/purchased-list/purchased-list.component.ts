import { Component } from '@angular/core';
import { OfferService } from '../offer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css'],
})
export class PurchasedListComponent {
  getUrl: string = 'http://localhost:3000/offers/get-assign-offer';
  firstName: any = '';
  disableButtonvalue = true;
  itemsPerPage: number = 4;
  currentPage: number = 1;
  totalItem: number = 0;
  data: any;
  searchData: any;
  userId: any;
  offerId: any;
  lastName: any;
  offerCode: any;
  merchant: any;
  brand: any;

  constructor(private offerService: OfferService, private datePipe: DatePipe) {}
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
      this.data = value.data;
      this.searchData = value.data;
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

  redeem(id: any) {
    this.offerService
      .redeemOffer('http://localhost:3000/offers/redeem-offer', {
        purchaseOfferId: id,
      })
      .subscribe((data: any) => {
        this.ngOnInit();
      });
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
  assign() {
    this.offerService
      .assignOffer('http://localhost:3000/offers/assign-offer', {
        userId: this.userId,
        offerId: this.offerId,
      })
      .subscribe((data: any) => {
        this.userId = '';
        this.offerId = '';
        this.ngOnInit();
      });
  }
}
