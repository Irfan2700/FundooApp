import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ServicesService } from "src/app/services/services.service";
// import { ToastrService } from "ngx-toastr";
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  hide = true;

  arrClick: any[];

  bclick = false;
  serv;
  baseClick;
  cardName = this.baseClick;
  ServicesService: any;

  respond(card) {
    console.log(card.name);
    this.serv = card.name;
    card.select = !card.select;
    for (let i = 0; i < this.arrClick.length; i++) {
      if (card.name === this.arrClick[i].name) {
        continue;
      }
      this.arrClick[i].select = false;
    }
    console.log(this.serv)
  }

  constructor(
    public dialog: MatDialog,
    private _signupService: ServicesService,
    public snackBar: MatSnackBar

  ) {
    this.arrClick = new Array();

  }

  terms() {
    const dialogRef = this.dialog.open(TermsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  flag = false;
  emailToast = false;
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
    phoneNumber: "9874563215",
    service: this.serv,
    createdDate: new Date(),
    modifiedDate: new Date(),
    username: "",
    email: "",
    emailVerified: true,
    password: ""
  };


// get f(){

//   return this.signupForm.controls;
// }

  formSubmit() {

    // this.submitted = true;

    // if(this.signupForm.invalid){
    //   return;
    // }

    let obsAdd = this._signupService.addData(
      "user/userSignUp",
      {
        firstName: this.reg.firstName,
        lastName: this.reg.lastName,
        phoneNumber: "9874588215",
        service: this.serv,
        createdDate: new Date(),
        modifiedDate: new Date(),
        username: this.reg.username,
        email: this.reg.email,
        emailVerified: true,
        password: this.reg.password
      }

    );

    obsAdd.subscribe(
      data => {
        console.log("Post is work", data);
        this.snackBar.open('Sign Up', 'SUCCESS!!', {
          duration: 3000
        });
      },
      error => {
        console.log("Error occur", error);
        this.snackBar.open('Sign Up', 'FAILED!!', {
          duration: 3000
        });
      }
    );
    // if(this.emailToast === true){

    //   this.toastrService.error("Email is required");
    // }
  }



  //validations

  // signupForm: FormGroup;
  // submitted = false;




  ngOnInit() {

     console.log(this.serv);
    // if (this.reg.email !== "" || this.reg.firstName !== "null") {

      let obsGet = this._signupService.getData("user");
      console.log(typeof this.arrClick);

      obsGet.subscribe(response => console.log(response));

      // this.formSubmit();

      let obsGetService = this._signupService.getData("user/service");
      obsGetService.subscribe(response => {
        console.log(response["data"].data);
        let res = response["data"].data;

        for (var i = 0; i < res.length; i++) {
          res[i].select = false;
          this.arrClick.push(res[i]);
        }
        console.log(res);
      });


      // this.signupForm = this.formBuilder.group({
      //   firstName: ['', Validators.required],
      //   lastName: ['', Validators.required],
      //   email: ['', Validators.required, Validators.email],
      //   username: ['', Validators.required, Validators.email],
      //   password: ['', Validators.required, Validators.minLength(6)]
      // })
  }
}

@Component({
  selector: "terms-dialog",
  templateUrl: "./termsAndCondition.html"
})

// tslint:disable-next-line:component-class-suffix
export class TermsDialog {}

// export class Register {
//   constructor(
//     firstName: string,
//     lastName: string,
//     phoneNumber: Number,
//     service: string,
//     createdDate: Date,
//     modifiedDate: Date,
//     username: string,
//     email: string,
//     emailVerified: true,
//     password: string
//   ) {}
// }
