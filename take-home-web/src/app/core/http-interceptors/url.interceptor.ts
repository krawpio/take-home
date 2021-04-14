import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {Observable} from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('assets') === -1) {
      const apiReq = req.clone({url: `${environment.server_url}${req.url}`});
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}
