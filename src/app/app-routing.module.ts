import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'offers',
    pathMatch: "full"
  },
  {
    path: 'voucher',
    loadChildren: () => import('./modules/voucher/voucher.module').then((b) => b.VoucherModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./modules/offers/offers.module').then((b) => b.OffersModule)
  },
  {
    path: 'ocr',
    loadChildren: () => import('./modules/ocr/ocr.module').then((b) => b.OcrModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((b) => b.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
