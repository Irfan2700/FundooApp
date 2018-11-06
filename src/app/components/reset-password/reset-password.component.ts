import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from "@angular/material";
import { ServicesService } from "./../../services/services.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private resetPassService: ServicesService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  res = {
    email: ""
  };

  resetSubmit() {
    let body = {
      email: this.res.email
    };

    if(body.email !== ""){

      if((/\S+@\S+\.\S+/).test(body.email)){

    let obsResetEmail = this.resetPassService.addData("user/reset", body);

    obsResetEmail.subscribe(
      data => {
        // console.log("Reset Link Sent Successfully!!", data);
        this.snackBar.open("Success!!", data["message"], {
          duration: 4000,
          panelClass: ["emailSnack-bar"],
          verticalPosition: "top",
          horizontalPosition: "center"
        });

        this.router.navigate(['/login']);
      },
      error => {
        
        this.snackBar.open("Failed", "Email is not Register.. Please Sign-up first!!", {
          duration: 5000,
          panelClass: ["emailSnack-bar"],
          verticalPosition: "top",
          horizontalPosition: "center"
        });

        this.router.navigate(['/signup']);

      }
    );

    }else{

      this.snackBar.open('Incorrect Credentials', 'Email is Incorrect', {
      duration: 5000,
      panelClass: ['emailSnack-bar'],
      verticalPosition: 'top',
    horizontalPosition: 'center',

    })
    }

    }else{

      this.snackBar.open("Incomplete Credentials", "Email is required",{
        duration: 5000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'center',

      })
    }
  }

  ngOnInit() {}
}

@Component({
  selector: "app-reset-set-password",
  templateUrl: "./reset-passwordSet.html",
  styleUrls: ["./reset-password.component.css"]
})

export class ResetPasswordSetComponent {

  constructor(private _resetSetPassService: ServicesService,
    public snackBar: MatSnackBar,
    private router: Router,
    private routerParam: ActivatedRoute,
    private auth: AuthService){

  }
  hide = true;

  respass = {
    password: "",
    conpass:""
  }
// public



  resetSubmit(){

    if(this.respass.password !== "" && this.respass.conpass){
    if(this.respass.password === this.respass.conpass){
    const token  = this.routerParam.snapshot.params.accessToken;


    this.auth.sendToken(token);

    let input = new FormData();
    input.append('newPassword', this.respass.password);
    const field = {"newPassword": this.respass.password}


   this._resetSetPassService.httpPostEncoded('user/reset-password',field).subscribe(
      data => {
        console.log("Password reset Successfully!!", data)
        this.snackBar.open("Success", "Password reset Successfully!!",{
          duration: 5000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
        horizontalPosition: 'center',

        })

        this.router.navigate(['/login']);
        this.auth.removeToken();
      },
      error => {
        // console.log("Error occur");
        this.snackBar.open("Failed", "Error occur while reseting Password",{
          duration: 5000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
        horizontalPosition: 'center',

        })
      }
    )
    }else{
      this.snackBar.open('Password Incorrect', 'Password is not matched', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'end',
      })
    }
  }else{
    this.snackBar.open('Incomplete Credentials', 'Password fields are empty', {
      duration: 4000,
      panelClass: ['emailSnack-bar'],
      verticalPosition: 'top',
    horizontalPosition: 'end',
    })

  }
  }


}
