import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OfferComponent } from './offer/offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OffersModule { }
