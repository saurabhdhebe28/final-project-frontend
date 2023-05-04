import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private toastre: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url1 = 'http://localhost:3000/auth/signUp'
    let url2 = 'http://localhost:3000/auth/login'
    if (request.url != url1 && request.url != url2) {
      let token: any = localStorage.getItem('token')
      if (!token) {
        this.toastre.error('Please Log in Again')
      }
      let addHeaders = request.clone({
        headers: request.headers.append('token', token)
      })
      return next.handle(addHeaders);
    }
    return next.handle(request)
  }
}