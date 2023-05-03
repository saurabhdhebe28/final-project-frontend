import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher/voucher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { RedeemVoucherListComponent } from './redeem-voucher-list/redeem-voucher-list.component';


@NgModule({
  declarations: [
    VoucherComponent,
    VoucherListComponent,
    PurchasedListComponent,
    RedeemVoucherListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VoucherRoutingModule,SharedModule,ReactiveFormsModule,NgxPaginationModule
  ]
})
export class VoucherModule { }
