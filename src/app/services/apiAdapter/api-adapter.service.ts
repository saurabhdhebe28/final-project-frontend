import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAdapterService {

  constructor(private http: HttpClient) { }
  get(url: string): Observable<any> {
    return this.http.get(url)
  }
  getWithHeaders(url: string, header: any) {
    return this.http.get(url, header)
  }
  post(url: string, data: any = ''): Observable<any> {
    return this.http.post(url, data)
  }
}
