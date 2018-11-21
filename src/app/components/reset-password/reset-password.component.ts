import { UserServicesService } from 'src/app/core/services/user-services.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from "@angular/material";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private userServices: UserServicesService
  ) { }

  res = {
    email: ""
  };

  resetSubmit() {
    let body = {
      email: this.res.email
    };

    if (body.email !== "") {

      if ((/\S+@\S+\.\S+/).test(body.email)) {

        let obsResetEmail = this.userServices.resetLink(body);

        obsResetEmail
          .pipe(takeUntil(this.destroy$))
          .subscribe(
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

      } else {

        this.snackBar.open('Incorrect Credentials', 'Email is Incorrect', {
          duration: 5000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
          horizontalPosition: 'center',

        })
      }

    } else {

      this.snackBar.open("Incomplete Credentials", "Email is required", {
        duration: 5000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',

      })
    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    console.log("it is destroyed")
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}

@Component({
  selector: "app-reset-set-password",
  templateUrl: "./reset-passwordSet.html",
  styleUrls: ["./reset-password.component.scss"]
})

export class ResetPasswordSetComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private routerParam: ActivatedRoute,
    private auth: AuthService,
    private userServices: UserServicesService) {

  }
  hide = true;

  respass = {
    password: "",
    conpass: ""
  }
  // public



  resetSubmit() {

    if (this.respass.password !== "" && this.respass.conpass) {
      if (this.respass.password === this.respass.conpass) {
        const token = this.routerParam.snapshot.params.accessToken;


        this.auth.sendToken(token);

        let input = new FormData();
        input.append('newPassword', this.respass.password);
        const field = { "newPassword": this.respass.password }


        this.userServices.resetPassword(field)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              console.log("Password reset Successfully!!", data)
              this.snackBar.open("Success", "Password reset Successfully!!", {
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
              this.snackBar.open("Failed", "Error occur while reseting Password", {
                duration: 5000,
                panelClass: ['emailSnack-bar'],
                verticalPosition: 'top',
                horizontalPosition: 'center',

              })
            }
          )
      } else {
        this.snackBar.open('Password Incorrect', 'Password is not matched', {
          duration: 4000,
          panelClass: ['emailSnack-bar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        })
      }
    } else {
      this.snackBar.open('Incomplete Credentials', 'Password fields are empty', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
      })

    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }



}
