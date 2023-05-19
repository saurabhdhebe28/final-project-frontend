import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toastre: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.router.url.includes('/dashboard/charts')) {
      return next.handle(request).pipe(
        tap((evt) => {
          if (evt instanceof HttpResponse) {
            if (evt.body) {
              let data: any = evt.body;

              if (data.status == false || data.status == 'false') {
                if (data.data) {
                  this.toastre.error(`Error:${data.data}`);
                }
                if (data.message) {
                  this.toastre.error(`error:${data.message}`);
                }
              }
              if (data.errors) {
                let obj = Object.keys(data.errors);
                let errorKey = obj[0];
                this.toastre.error(data.errors[errorKey][0]);
              }
              if (
                (data.status == true &&
                  (typeof data.data == 'string' ||
                    typeof data.message == 'string')) ||
                data.status == 'true'
              ) {
                if (data.message) {
                  this.toastre.success(`${data.message}`);
                }
                if (typeof data.data == 'string') {
                  this.toastre.success(`${data.data}`);
                }
              }
            }
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
