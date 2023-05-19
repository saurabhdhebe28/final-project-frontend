import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'voucher',
    loadChildren: () =>
      import('./modules/voucher/voucher.module').then((b) => b.VoucherModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./modules/offers/offers.module').then((b) => b.OffersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ocr',
    loadChildren: () =>
      import('./modules/ocr/ocr.module').then((b) => b.OcrModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((b) => b.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (b) => b.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((b) => b.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
