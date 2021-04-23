/*
 ============================================
; Title:  error.interceptor.ts
; Author: Professor Krasso
; Date: 22 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: This interceptor will catch error
; codes like 400 and 500
;===========================================
 */



import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router){
  }

  /**
   *
   * @param req
   * @param next
   * Promise that accepts an observable function,
   * pipe function that catches and handles the error
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(err => {

        /**
         * Routes for 404 errors
         * it navigates to session 404 if the
         * user goes to a wrong path or route within
         * the web application server
         */
        if ([404].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/404']);
        }

        /**
         * Routes for 500 errors
         * it navigates to session 500 if the
         * user goes to a path that returns an server error
         * or code 500 code, this usually happens when the server is not working
         */
        if ([500].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/500']);
        }

        /**
         * Error that can catch other error codes
         * it will show other error codes if it's not 404 or 500
         */
        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
  }
}
