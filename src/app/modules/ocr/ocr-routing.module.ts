import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OcrListComponent } from './ocr-list/ocr-list.component';
import { AddOcrComponent } from './add-ocr/add-ocr.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ocrList',
    pathMatch: 'full'
  },
  {
    path: 'ocrList',
    component: OcrListComponent
  },
  {
    path: 'addOcr',
    component: AddOcrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcrRoutingModule { }
