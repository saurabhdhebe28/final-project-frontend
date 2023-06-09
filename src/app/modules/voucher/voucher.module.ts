import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher/voucher.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VoucherComponent
  ],
  imports: [
    CommonModule,
    VoucherRoutingModule,SharedModule
  ]
})
export class VoucherModule { }
