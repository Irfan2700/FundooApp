import { LoggerService } from 'src/app/core/services/logger.service';
import { UserServicesService } from './../../core/services/user-services.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  hide = true;

  constructor(
    public snackBar: MatSnackBar,
    private myRoute: Router,
    private auth: AuthService,
    private userServices: UserServicesService) { }


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
    let obsPost = this.userServices.userLogin(body)

    obsPost
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        console.log("Login Successfully!!", data);
        this.auth.sendToken(data["id"]);
        this.auth.sendId(data["userId"]);
        this.auth.sendUserEmail(body.email);
        this.auth.sendUserName(data['firstName']+" "+data['lastName']);

        let requestBody = {
          "pushToken": this.auth.getPushToken()
        }

        this.userServices.registerPushToken(requestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respo => {
            LoggerService.log("One Notification you received")
          }
        )

        this.snackBar.open('Success!!', 'Login Successfully!!', {
          duration: 4000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
        horizontalPosition: 'center',

        })

          this.myRoute.navigate(["home"]);



      },
      error => {
        // console.log("Error occur While login");
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

    // let obsGet = this.userServices.getUserInfo();
    // obsGet.subscribe((response) => {
    //   // console.log(response);
    // })
    if(this.auth.getToken()){
      this.myRoute.navigate(["home"]);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    console.log("it is destroyed")
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
