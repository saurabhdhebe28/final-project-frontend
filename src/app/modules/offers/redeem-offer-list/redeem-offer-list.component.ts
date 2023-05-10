import { Component } from '@angular/core';
import { OfferService } from '../offer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-redeem-offer-list',
  templateUrl: './redeem-offer-list.component.html',
  styleUrls: ['./redeem-offer-list.component.css']
})
export class RedeemOfferListComponent {
  getUrl:string='http://localhost:3000/offers/redeem-list';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData:any;

  constructor(private offerService: OfferService,private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.getPurchasedOffers()
  }
  getPurchasedOffers() {
    this.offerService.getOffer(this.getUrl).subscribe((value: any) => {
      value.data.map((ele: any) => {
        ele.offerExpiryDate = this.datePipe.transform(
          ele.offerExpiryDate,
          'dd-MM-yyyy'
        );
      });
      this.searchData= value.data;
      this.data = value.data;
    })
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }
  search() {
    this.searchData = this.data
    if (!this.firstName) {
     this.ngOnInit()
    }
    this.searchData =this.data.filter((value: any) => {
      return value.firstName.toLowerCase().startsWith(this.firstName.toLowerCase())
    });
  }
}
