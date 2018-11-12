import { AuthService } from '../services/auth.service'
//import { element } from 'protractor';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { getViewData } from '@angular/core/src/render3/instructions';

//import { Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  constructor(private http: HttpClient,
    private auth: AuthService,
    ) {}

    // environment.
  url = "http://34.213.106.173/api";

  getData(nextUrl) {
    return this.http.get(this.url + "/" + nextUrl);
  }

  // get(nextUrl) {
  //   var httpAuthOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.auth.getToken()
  //     })

  //   };
  //   return this.http.get(this.url + "/" + nextUrl, httpAuthOptions);
  // }

  // addData(nextUrl, body) {
  //   // console.log(body);
  //   return this.http.post(this.url + "/" + nextUrl, body);
  // }

  post(nextUrl, body) {
    // console.log(body);
    return this.http.post(this.url + "/" + nextUrl, body)
  }

  httpPostEncoded(urlPart,body){

    var httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.auth.getToken()
      })

    };
    return this.http.post(this.url + "/" + urlPart, this.getFormUrlEncoded(body), httpAuthOptions)
  }

  httpPostEncoded2(urlPart,body){

    var httpAuthOptions = {
      headers: new HttpHeaders({
        
        'Authorization': this.auth.getToken()
      })

    };
    return this.http.post(this.url + "/" + urlPart, body, httpAuthOptions)
  }

  httpPostlogout(urlPart,body){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    return this.http.post(this.url + "/" + urlPart, this.getFormUrlEncoded(body), httpAuth1Options)
  }

  httpPostJson(urlPart,body){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    return this.http.post(this.url + "/" + urlPart, body, httpAuth1Options)
  }

  httpGetJson(urlPart){

    var httpAuthoptions = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    return this.http.get(this.url + "/" + urlPart, httpAuthoptions)
  }


  httpDeleteJson(urlPart){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      })
    };
    
    return this.http.delete(this.url + "/" + urlPart, httpAuth1Options)
  }



  public getFormUrlEncoded(toConvert) {
    const formBody = [];
    for(const property in toConvert){
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey+ '=' + encodedValue);
    }
    return formBody.join('&');
  }

}
