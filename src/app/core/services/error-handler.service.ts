import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any){

    let router = this.injector.get(Router);
    console.log('URL: '+ router.url);

    if(error instanceof HttpErrorResponse){

      if(!navigator.onLine){
        alert("Internet is Note Avalible");
      }else{
        alert("Server Error is Occured");
      }

      // if(!error.status){

      //   console.log("internet not found")
      //   alert("Internet is not Available")
      //   // window.location.href= '/test'
      // }else{
      //   alert("Internet Failed error is not work")
      // }
      alert("Argo Chutiya ho gya hai")
      console.error("Server Sending some Error");
      console.error("Response Body: ", error.message);
    }else{
      console.error("An error Occured: ", error.message);
    }
  }
}
