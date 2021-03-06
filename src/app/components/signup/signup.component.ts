import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { UserServicesService } from 'src/app/core/services/user-services.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// import { ToastrService } from "ngx-toastr";
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  hide = true;

  arrClick: any[];

  bclick = false;
  serv = null;
  baseClick;
  cardName = this.baseClick;
  ServicesService: any;

  respond(card) {

    this.serv = card.name;
    card.select = !card.select;
    if(card.select === false){
      this.serv = '';
    }
    for (let i = 0; i < this.arrClick.length; i++) {
      if (card.name === this.arrClick[i].name) {
        continue;
      }
      this.arrClick[i].select = false;
    }
    
  }

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userService: UserServicesService

  ) {
    this.arrClick = new Array();

  }

  agree = false;

  deal(){
    this.agree = !this.agree;
  }

  terms() {
    const dialogRef = this.dialog.open(TermsDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  // flag = false;
  // emailToast = false;
  // emailT(){
  //   this.emailToast=true;
  // }

  // reg: any = {};

   //reg = new Register('','',9876543210, this.serv, new Date(), new Date(), '', 'gorav@gmail.com', true, '1234abc');
  // newRegister(){

  //   this.reg = new Register('','',9876543211,this.serv, new Date(), new Date(), '', '', true, '')
  // }
  reg = {
    firstName: "",
    lastName: "",
    service: "",
    email: "",
    emailVerified: true,
    password: "",
    conpass:""
  };


// get f(){

//   return this.signupForm.controls;
// }
  pass;
  confirmpass;


  formSubmit() {



        let body = {
          firstName: this.reg.firstName,
          lastName: this.reg.lastName,
          service: this.serv,
          email: this.reg.email,
          emailVerified: true,
          password: this.reg.password
        }

        this.pass = this.reg.password;
        this.confirmpass = this.reg.conpass;

        if((body.firstName !== "") && (body.lastName !== "") && (body.email !== "") && (body.password !== "") && (this.reg.conpass !== ""))
        {

          if((/\S+@\S+\.\S+/).test(body.email)){
          if(body.service !== null && body.service.length !== 0 ){

            if(this.pass === this.confirmpass){

    let obsAdd = this.userService.userSignup(body);

    obsAdd
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        // console.log("Post is work", data);
        this.snackBar.open('Sign Up', 'SUCCESS!!', {
          duration: 3000
        });
      },
      error => {
        // console.log("Error occur", error);
        this.snackBar.open('Sign Up', 'FAILED!!', {
          duration: 4000
        });
      }
    );

    }else{
      this.snackBar.open('Password Incorrect', 'Password is not matched', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'end',
      })
    }
    }else{
      this.snackBar.open('Incomplete Form Field', 'Please Select one of the card Basic or Advance', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'end',
      })
    }
  }else{
    this.snackBar.open('Incomplete Form Field', "'"+ body.email +"'" + ' is not a correct email', {
      duration: 4000,
      panelClass: ['emailSnack-bar'],
      verticalPosition: 'top',
    horizontalPosition: 'end',
    //announcementMessage: body.email + ' is not a correct email'

    })
  }
    }else{
      this.snackBar.open('Incomplete Form Field', 'Please Enter the all Credential!!', {
        duration: 4000,
        panelClass: ['emailSnack-bar'],
        verticalPosition: 'top',
      horizontalPosition: 'end',

      })
    }
    // if(this.emailToast === true){

    //   this.toastrService.error("Email is required");
    // }
  }



  //validations

  // signupForm: FormGroup;
  // submitted = false;




  ngOnInit() {

    //  console.log(this.serv);
    // if (this.reg.email !== "" || this.reg.firstName !== "null") {

      let obsGet = this.userService.getServiceSelect();
      

      obsGet
      .pipe(takeUntil(this.destroy$))
      .subscribe(response =>
         {
          let res = response["data"].data;

          for (var i = 0; i < res.length; i++) {
            res[i].select = false;
            this.arrClick.push(res[i]);
          }
         }
         
         );

      // this.formSubmit();

      let obsGetService = this.userService.getUserInfo();
      obsGetService
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        console.log("ye wala",response);
        // if()
        
        // console.log(res);
      });


      // this.signupForm = this.formBuilder.group({
      //   firstName: ['', Validators.required],
      //   lastName: ['', Validators.required],
      //   email: ['', Validators.required, Validators.email],
      //   username: ['', Validators.required, Validators.email],
      //   password: ['', Validators.required, Validators.minLength(6)]
      // })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}

@Component({
  selector: "terms-dialog",
  templateUrl: "./termsAndCondition.html"
})

// tslint:disable-next-line:component-class-suffix
export class TermsDialog {}


