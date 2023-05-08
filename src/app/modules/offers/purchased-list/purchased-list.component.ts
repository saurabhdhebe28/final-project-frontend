import { Component } from '@angular/core';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  getUrl:string='http://localhost:3000/offers/get-assign-offer';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  constructor(private offerService: OfferService) { }
  ngOnInit(): void {
    this.getPurchasedOffers()
  }
  getPurchasedOffers() {
    this.offerService.getOffer(this.getUrl).subscribe((value: any) => {
      this.data = value.data
    })
    
    
    return this.data
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }

  redeem(id:any){
    this.offerService.redeemOffer('http://localhost:3000/offers/redeem-offer',{purchaseOfferId:id}).subscribe((data:any)=>{
      this.ngOnInit();
    });

  }
  search() {
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })
  }
}
