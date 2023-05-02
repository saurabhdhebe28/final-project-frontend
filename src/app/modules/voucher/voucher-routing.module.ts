import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';

const routes: Routes = [
  
  {
    path:'',
    redirectTo:'add-voucher',
    pathMatch:'full'
  },
  {
    path:'add-voucher',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
