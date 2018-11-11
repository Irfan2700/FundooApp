
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  sendToken(token: string){
    localStorage.setItem("UserToken", token);
  }

  sendId(id: string) {
    return localStorage.setItem("UserId", id);
  }

  sendPic(image: string){
    return localStorage.setItem("ProfilePic", image);
  }

  sendUserName(name: string){
    return localStorage.setItem("UserName", name);
  }

  sendUserEmail(email: string){
    return localStorage.setItem("UserEmail", email);
  }

  getToken() {
    return localStorage.getItem("UserToken")
  }

  getId(){
    return localStorage.getItem("UserId");
  }

  getPic(){
    return localStorage.getItem("ProfilePic")
  }

  getUserName(){
    return localStorage.getItem("UserName");
  }

  getUserEmail(){
    return localStorage.getItem("UserEmail")
  }

  removeToken(){
    return localStorage.removeItem("UserToken");
  }

  removeId(){
    return localStorage.removeItem("UserId");
  }

  // isLoggedIn() {
  //   return this.getToken() !== null;
  // }

  // logout() {
  //   this.myService.httpPostlogout("user/logout").subscribe(
  //     data => {
  //       console.log("logout Successfully");
  //       localStorage.removeItem("UserToken");
  //       localStorage.removeItem("UserId");

  //   this.myRoute.navigate(["login"]);
  //     },
  //     error => {
  //       console.log("Error occur")
  //     }
  //   )

  // }
}
