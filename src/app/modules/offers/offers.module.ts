import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OfferComponent } from './offer/offer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule
  ]
})
export class OffersModule { }
