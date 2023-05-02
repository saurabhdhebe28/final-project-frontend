import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OfferComponent } from './offer/offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferListComponent } from './offer-list/offer-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { RedeemOfferListComponent } from './redeem-offer-list/redeem-offer-list.component';


@NgModule({
  declarations: [
    OfferComponent,
    OfferListComponent,
    PurchasedListComponent,
    RedeemOfferListComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class OffersModule { }
