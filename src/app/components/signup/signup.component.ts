import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  hide = true;

  arrClick: any[];

  bclick = false;
  serv = null;
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
  }

  constructor(
    public dialog: MatDialog,
    private _signupService: ServicesService
  ) {
    this.arrClick = new Array();
  }

  terms() {
    const dialogRef = this.dialog.open(TermsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  reg = {
    "firstName": "",
      "lastName": "",
      "phoneNumber": "9876543210",
      "service": this.serv,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "username": "",
      "email": "",
      "emailVerified": true,
      "password": ""
  }

  formSubmit(){
    return this.reg;
  }

  ngOnInit() {
    let obsGet = this._signupService.getData("user");
    console.log(typeof this.arrClick);

    obsGet.subscribe(response => console.log(response));

    let obsAdd = this._signupService.addData('user/userSignUp', this.formSubmit()
    //{
    //   "firstName": "Gourav",
    //   "lastName": "Mishra",
    //   "phoneNumber": "9876543210",
    //   "service": "Basic",
    //   "createdDate": "2018-10-09T06:35:12.617Z",
    //   "modifiedDate": "2018-10-09T06:35:12.617Z",
    //   "username": "gorav@gmail.com",
    //   "email": "gorav@gmail.com",
    //   "emailVerified": true,
    //   "password": "123456abc"
    //  }

    )

    obsAdd.subscribe(data => {console.log('Post is work', data)},
    error => {console.log('Error occur',error)})

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
  }
}

@Component({
  selector: "terms-dialog",
  templateUrl: "./termsAndCondition.html"
})

// tslint:disable-next-line:component-class-suffix
export class TermsDialog {}
