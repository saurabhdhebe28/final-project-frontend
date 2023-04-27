import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'voucher',
    loadChildren:()=>import('./modules/voucher/voucher.module').then((b)=>b.VoucherModule)
  },
  {
    path:'offers',
    loadChildren:()=>import('./modules/offers/offers.module').then((b)=>b.OffersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
