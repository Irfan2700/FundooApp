import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private _loginService: ServicesService,
    public snackBar: MatSnackBar,
    private myRoute: Router,
    private auth: AuthService) { }


  log = {
    email: "",
    password: ""
  }


  loginSubmit(){
    // debugger;
    let body = {
      email: this.log.email,
      password: this.log.password
    }

    if(body.email !== "" ){
    if(body.password !== ""){
      if((/\S+@\S+\.\S+/).test(body.email)){
    let obsPost = this._loginService.addData("user/login", body)

    obsPost.subscribe(
      data => {
        console.log("Login Successfully!!", data);

        this.auth.sendToken(data["id"]);
        this.auth.sendId(data["userId"]);

        this.snackBar.open('Success!!', 'Login Successfully!!', {
          duration: 4000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
        horizontalPosition: 'center',

        })

          this.myRoute.navigate(["home"]);



      },
      error => {
        console.log("Error occur While login");
      },

    );
    }else{
      this.snackBar.open('Incomplete Form Field', "'"+ body.email +"'" + ' is not a correct email', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'center',

      })
    }
    }else{
      this.snackBar.open("Incomplete Credentials", "Password is Required", {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'center',
      })
    }
    }else{
      this.snackBar.open("Incomplete Credentials", "Email is Required", {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'center',
      })
    }
  }

  ngOnInit() {

    let obsGet = this._loginService.getData("user");
    obsGet.subscribe((response) => {
      console.log(response);
    })
    if(this.auth.getToken()){
      this.myRoute.navigate(["home"]);
    }
  }

}
