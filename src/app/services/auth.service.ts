import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: string){
    localStorage.setItem("UserToken", token);
  }

  sendId(id: string) {
    return localStorage.setItem("UserId", id);
  }

  getToken() {
    return localStorage.getItem("UserToken")
  }

  getId(){
    return localStorage.getItem("UserId");
  }

  // isLoggedIn() {
  //   return this.getToken() !== null;
  // }

  logout() {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserId");
    this.myRoute.navigate(["login"]);
  }
}
