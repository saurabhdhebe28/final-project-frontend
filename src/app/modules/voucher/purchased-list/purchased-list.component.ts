import { Component } from '@angular/core';
import { OfferService } from '../../offers/offer.service';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  getUrl:string='http://localhost:3000/voucher/redeem-voucher-list';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  constructor(private offerService: OfferService) { }
  ngOnInit(): void {
    this.getPurchasedVouchers()
  }
  getPurchasedVouchers() {
    this.offerService.getOffer(this.getUrl).subscribe((value: any) => {
      this.data = value.data
    })
  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.firstName
  }
  search() {
    // this.offerService.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
    //   this.data = value.data

    //   this.totalItem = this.data.length
    // })

  }
}
