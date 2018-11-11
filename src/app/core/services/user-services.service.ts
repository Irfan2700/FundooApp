import { ServicesService } from 'src/app/core/services/services.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private httpService: ServicesService) { }

  userSignup(requesBody){

    return this.httpService.post("user/userSignUp", requesBody);
  }

  getServiceSelect(){
    return this.httpService.getData("user/service");
  }

  userLogin(requestBody){

    return this.httpService.post("user/login", requestBody);
  }

  getUserInfo(){
    return this.httpService.getData("user");
  }

  resetLink(requestBody){
    return this.httpService.post("user/reset", requestBody);
  }

  resetPassword(requestBody){
    return this.httpService.httpPostEncoded("user/reset-password", requestBody);
  }

  userLogout(){
    return this.httpService.httpPostlogout("user/logout",null);
  }

  profilePicUploader(body){
    return this.httpService.httpPostEncoded2("user/uploadProfileImage", body);
  }
}
