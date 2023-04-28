import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private httpClient: HttpClient) { }
  addOcr(url: string) {
    return this.httpClient.post('http://localhost:3001/api/url', url)
  }

  ocrList(): Observable<any> {
    return this.httpClient.get('http://localhost:3001/api/ocrList')
  }
}
