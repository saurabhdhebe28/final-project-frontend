import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private toastre: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            let data: any = evt.body
            if (data.status == false || data.errors) {
              this.toastre.error(`Error:${data.data || data.errors.url[0]}`)
            }
            if (data.status == true && typeof data.data == 'string') {
              this.toastre.success(`${data.data}`)
            }
          }
        }
      })
    )
  }
}
