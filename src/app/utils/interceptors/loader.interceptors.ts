// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize, tap } from 'rxjs/operators';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {

//     constructor(private spinner: NgxSpinnerService
//     ) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         this.spinner.show();
//         return next.handle(request).pipe(
//             finalize(() => {
//                 // hide the loader when request is finalized.
//                 this.spinner.hide();
//             }),
//             tap(event => {
//                 if (event instanceof HttpResponse) {
//                     if (event.body) {

//                         // get the name of obj in response
//                         const key = request.url.split('/')[request.url.split('/').length - 1];
//                         (!!!event.body.data[key] ) ? null : this.admin.noDataFound(!!!event.body.data[key].length);
//                     }
//                 }
//             })
//         )
//     }
// }
