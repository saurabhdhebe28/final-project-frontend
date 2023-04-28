import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OcrRoutingModule } from './ocr-routing.module';
// import { OcrComponent } from './ocr/ocr.component';
import { AddOcrComponent } from './add-ocr/add-ocr.component';
import { OcrListComponent } from './ocr-list/ocr-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    // OcrComponent,
    AddOcrComponent,
    OcrListComponent
  ],
  imports: [
    CommonModule,
    OcrRoutingModule,SharedModule
  ]
})
export class OcrModule { }
