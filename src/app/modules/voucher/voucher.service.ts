import { Injectable } from '@angular/core';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private apiAdapter:ApiAdapterService) { }
  
  getVoucher(url:any){
    return this.apiAdapter.get(url)
  }

}
