import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()//{providedIn: 'root'}

export class InterceptService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // modify request
    request = request.clone({
      setHeaders: {

        Authorization: `${this.auth.getToken()}`
      }
    });

    // LoggerService.log("----request----");

    LoggerService.log(request);

    // LoggerService.log("--- end of request---");


    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            // LoggerService.log(" all looks good");
            // // http response status code
            LoggerService.log(event.status);
          }
        }, error => {
          // http response status code
          // LoggerService.log("----response----");
          // LoggerService.error("status code:");
          LoggerService.error(error.status);
          LoggerService.error(error.message);
          // LoggerService.log("--- end of response---");

        })
      )

  };


}
