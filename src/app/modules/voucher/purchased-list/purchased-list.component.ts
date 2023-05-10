import { Component } from '@angular/core';
import { VoucherService } from '../voucher.service';
import { DatePipe } from '@angular/common';
import { OfferService } from '../../offers/offer.service';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  getUrl:string='http://localhost:3000/voucher/purchase-voucher';
  firstName: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any;
  searchData:any;
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
 this.searchData = this.data
    if (!this.firstName) {
      this.ngOnInit()
     }
     this.searchData = this.data.filter((value: any) => {
      return value.firstName.toLowerCase().startsWith(this.firstName.toLowerCase())
    });
  }
}
