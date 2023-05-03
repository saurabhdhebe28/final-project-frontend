import { Injectable } from '@angular/core';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private apiAdapter:ApiAdapterService) { }

  getOffer(url:any){
    return this.apiAdapter.get(url)
  }
  createOffer(url:any,body:any){
    return this.apiAdapter.post(url,body)

  }
}
