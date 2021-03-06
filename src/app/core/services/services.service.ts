import { environment } from './../../../environments/environment';
import { AuthService } from '../services/auth.service'
//import { element } from 'protractor';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/takeUntil'
//import { getViewData } from '@angular/core/src/render3/instructions';

//import { Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  constructor(private http: HttpClient,
    private auth: AuthService,
    ) {}

    // ngOnInit(): void {
    //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //   //Add 'implements OnInit' to the class.
    //   url =environment.baseUrl
    // }
  url = environment.baseUrl;


  getData(nextUrl) {
    return this.http.get(this.url + "/" + nextUrl);
  }

  

  post(nextUrl, body) {
    // console.log(body);
    return this.http.post(this.url + "/" + nextUrl, body)
  }

  httpPostEncoded(urlPart,body){

    var httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': this.auth.getToken()
      })

    };
    return this.http.post(this.url + "/" + urlPart, this.getFormUrlEncoded(body), httpAuthOptions)
  }

  httpPostEncoded2(urlPart,body){

    var httpAuthOptions = {
      headers: new HttpHeaders({
        
        // 'Authorization': this.auth.getToken()
      })

    };
    return this.http.post(this.url + "/" + urlPart, body, httpAuthOptions)
  }

  httpPostlogout(urlPart,body){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',
        // 'Authorization': this.auth.getToken()
      })
    };
    return this.http.post(this.url + "/" + urlPart, this.getFormUrlEncoded(body), httpAuth1Options)
  }

  httpPostJson(urlPart,body){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json'
        // 'Authorization': this.auth.getToken()
      })
    };
    return this.http.post(this.url + "/" + urlPart, body, httpAuth1Options)
  }

  httpGetJson(urlPart){

    var httpAuthoptions = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json'
        // 'Authorization': this.auth.getToken()
      })
    };
    return this.http.get(this.url + "/" + urlPart, httpAuthoptions);
  }


  httpDeleteJson(urlPart){

    var httpAuth1Options = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json'
        // 'Authorization': this.auth.getToken()
      })
    };
    
    return this.http.delete(this.url + "/" + urlPart)
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
