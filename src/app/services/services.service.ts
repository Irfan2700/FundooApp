//import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { getViewData } from '@angular/core/src/render3/instructions';

//import { Observable} from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})



export class ServicesService {

  constructor(private http: HttpClient) { }

  url = 'http://34.213.106.173/api'

  getData(nextUrl){
    return this.http.get(this.url+'/'+nextUrl);

}

addData(nextUrl,body){

  console.log(body);
  return this.http.post(this.url+'/'+nextUrl, body)
}



}
