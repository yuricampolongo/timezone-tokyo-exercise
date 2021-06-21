import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

/**
 * Mocks the requests for testing
 */
@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): 
              Observable<HttpEvent<any>> {
        if (request.url && request.url.indexOf(`/timezone/`) > -1) {
            let expectedTimezone = {name:"Tokyo", gmt_offset:9}
            return of(new HttpResponse({ status: 200, body: expectedTimezone }));
        }

        return next.handle(request);
    }
}