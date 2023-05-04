import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent {
  getUrl:string='http://localhost:3000/offers/get-offers';
  offerTitle: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  constructor(private offerService: OfferService) { }
  ngOnInit(): void {
    this.getOffers()
  }
  getOffers() {
    this.offerService.getOffer(this.getUrl).subscribe((value: any) => {
      
      this.data = value.data
    })

    return this.data;
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.offerTitle
  }

  redeem(code:any){
    const body = {offerCode:code}
    this.offerService.redeemOffer('http://localhost:3000/offers/redeem-offer',body).subscribe((data:any)=>{
      console.log(data);
      
    });
    this.getOffers();
  }
  search() {
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })

  }
}
