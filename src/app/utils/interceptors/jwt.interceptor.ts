import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /********** add authorization header with jwt token if available **********/
    const token: string = 'a0a08ae1a7ce64bb7ab745f8b08a337c7f006c43c60a98b61f44c7476adb9848828657d4b37ed5f8918ea714e49f01d5e863dbef47152ec0bf28ed2b5e403813ca09e850011a6ea6b66c317b92872e86f47b4ad7ec0660668cce8445057069871a14b30faef8e7bb42389c6d346d99e7a43b78bdbb15e6cea963780166b34647';
    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
    }

    return next.handle(request);
  }
}
