import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcrRoutingModule } from './ocr-routing.module';
import { AddOcrComponent } from './add-ocr/add-ocr.component';
import { OcrListComponent } from './ocr-list/ocr-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule,  } from 'ngx-pagination';


@NgModule({
  declarations: [
    // OcrComponent,
    AddOcrComponent,
    OcrListComponent
  ],
  imports: [
    CommonModule,
    OcrRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class OcrModule { }
