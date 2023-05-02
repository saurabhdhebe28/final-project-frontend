import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
