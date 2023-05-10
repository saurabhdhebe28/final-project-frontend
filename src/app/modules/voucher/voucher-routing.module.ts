import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { RedeemVoucherListComponent } from './redeem-voucher-list/redeem-voucher-list.component';

const routes: Routes = [
  
  {
    path:'',
    redirectTo:'create-voucher',
    pathMatch:'full'
  },
  {
    path:'create-voucher',
    component:VoucherComponent
  },
  {
    path:'voucher-list',
    component:VoucherListComponent
  },
  {
    path: 'purchased-voucher-list',
    component: PurchasedListComponent,
  },
  {
    path: 'redeemed-voucher-list',
    component: RedeemVoucherListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
