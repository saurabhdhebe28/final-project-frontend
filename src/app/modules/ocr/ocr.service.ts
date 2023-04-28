import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private httpClient: HttpClient) { }
  addOcr(url: any): Observable<any> {
    let endpoint = 'http://localhost:3001/api/url'
    return this.httpClient.post<any>(endpoint, url)
  }

  ocrList(): Observable<any> {
    let endpoint = 'http://localhost:3001/api/orcList'
    return this.httpClient.get<any>(endpoint)
  }
}
