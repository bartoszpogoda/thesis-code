import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiError} from '../models/error';

/**
 * This interceptor maps standard error to ApiError model
 * which is standard format returned by backend API.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  apiConnectionError: ApiError = {
    message: 'Api connection error',
    details: 'Service doesn\'t respond. Please try again later.'
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError((error, caught) => {
      console.log(error);
      throw error.error.code ? error.error : this.apiConnectionError;
    }) as any);
  }

}
