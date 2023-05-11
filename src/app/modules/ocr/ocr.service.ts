import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { ApiAdapterService } from 'src/app/services/apiAdapter/api-adapter.service';


@Injectable({
  providedIn: 'root'
})
export class OcrService {

  // constructor(private httpClient: HttpClient) { }
  // addOcr(url: any) {
  //   let endpoint = 'http://localhost:3001/api/url'
  //   return this.httpClient.post<any>(endpoint, url)
  // }

  // ocrList(): Observable<any> {
  //   let endpoint = 'http://localhost:3001/api/orcList'
  //   return this.httpClient.get<any>(endpoint)
  // }

  constructor(private apiAdapter: ApiAdapterService) { }

  addOcr(url: any) {
    let endpoint = 'http://localhost:3000/orc/url'
    return this.apiAdapter.post(endpoint, url)
  }
  ocrList() {
    let endpoint = 'http://localhost:3000/orc/orcList'
    return this.apiAdapter.get(endpoint)
  }
  ocrListSearch(requestedBy: any, tin: any) {
    let endpoint = `http://localhost:3000/orc/search?requestedBy=${requestedBy}&tin=${tin}`
    return this.apiAdapter.get(endpoint)
  }
  gethtmlTemplate(url: any) {
    // let endpoint = 'http://localhost:3000/orc/'
  }
  addOcrByFile(data: any) {
    let endpoint = 'http://localhost:3000/orc/add_ocr_by_file'
    return this.apiAdapter.post(endpoint, data)
  }
  downLoadFile(header: any) {
    let endpoint = 'http://localhost:3000/orc/download_file'
    return this.apiAdapter.getWithHeaders(endpoint,header)
  }
}
