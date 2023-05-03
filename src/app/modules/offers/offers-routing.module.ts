import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { RedeemOfferListComponent } from './redeem-offer-list/redeem-offer-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-offer',
    pathMatch: 'full',
  },
  {
    path: 'create-offer',
    component: OfferComponent,
  },
  {
    path: 'offer-list',
    component: OfferListComponent,
  },
  {
    path: 'purchased-offer-list',
    component: PurchasedListComponent,
  },
  {
    path: 'redeemed-offer-list',
    component: RedeemOfferListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
